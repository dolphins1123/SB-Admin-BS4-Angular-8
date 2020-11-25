import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserData } from '../../model/domain';
import { QueryModel } from '../../model/QueryModel';
import { routerTransition } from '../../router.animations';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    closeResult: string;
    constructor(private dataService: DataService, private modalService: NgbModal) {}
    queryModel = new QueryModel();
    currentPage = 1;
    totalPage = 0;
    pageSize = 10;
    ModalMode = ''; // 編輯模式  add / upd
    modalTitle = 'TITLE';
    displayedColumns = ['客戶ID', '公司名稱', '城市', '地址', '管理'];
    collectionSize = 0;

    Customers: UserData[];
    public Customer = new UserData();
    JsonData: any;

    Cities = ['臺北', '臺中', '高雄'];

    ngOnInit() {
        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.collectionSize = res.totalRowCount;
            this.totalPage = res.totalPage;
            console.log('init  data source=', res);
            console.log('init Customers=', this.Customers);
        });
    }

    QueryData() {
        this.currentPage = 1;
        this.queryModel.pageIndex = this.currentPage;

        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.totalPage = res.totalPage;
            this.collectionSize = res.totalRowCount;
        });
    }

    doEdit(row) {
        this.ModalMode = 'upd';
        this.modalTitle = '編輯資料';
        console.log('編輯列', row);
        this.Customer = row;
    }

    public onPageChange(pageNum: any): void {
        console.log('pageNum=', pageNum);
        this.currentPage = pageNum;
        this.queryModel.pageIndex = pageNum;

        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.totalPage = res.totalPage;
            this.collectionSize = res.totalRowCount;
            console.log('collectionSize=', this.collectionSize);
        });
    }

    public changePagesize(num: number): void {
        this.pageSize = this.pageSize + num;
    }

    open(content) {
        this.modalService.open(content).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    clearNew() {
        this.ModalMode = 'add';
        this.modalTitle = '新增資料';
        this.Customer = new UserData();
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    doSubmit() {
        console.log('do submit');
        console.log(this.Customer);

        if (this.ModalMode === 'add') {
            this.dataService.DoCreate(this.Customer).then((res) => {
                console.log('create res=', res);
                // todo
                // if success
                if (res.success === true) {
                    // alert
                    this.QueryData();
                } else {
                    // show error
                }
            });
        } else {
            // upd
            this.dataService.DoUpdate(this.Customer).then((res) => {
                console.log('DoUpdate res=', res);
            });
        }
    }
}
