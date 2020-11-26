import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserData } from '../../model/domain';
import { QueryModel } from '../../model/QueryModel';
import { routerTransition } from '../../router.animations';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'ngx-angular8-sweetalert2';
import { DatePickerComponent } from '../bs-component/components/date-picker/date-picker.component';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    now = new Date();
    demoDate: NgbDateStruct;
    defaultTime = { hour: 13, minute: 30 };
    closeResult: string;
    constructor(private dataService: DataService, private modalService: NgbModal) {}
    queryModel = new QueryModel();
    currentPage = 1;
    totalPage = 0;
    pageSize = 10;

    isAddMode = false; // add mode ?
    modalTitle = 'TITLE';
    displayedColumns = ['客戶ID', '公司名稱', '城市', '地址', '管理'];
    collectionSize = 0;

    Customers: UserData[];
    public Customer = new UserData();

    public editRow = new UserData();

    JsonData: any;

    Cities = ['臺北', '臺中', '高雄'];

    ngOnInit() {
        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.collectionSize = res.totalRowCount;
            this.totalPage = res.totalPage;
        });
        this.selectToday();
    }

    selectToday() {
        this.demoDate = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
    }

    simpleAlert() {
        Swal.fire('Hello world!');
    }

    alertWithSuccess() {
        Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
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
        this.isAddMode = false;
        this.modalTitle = '編輯資料';
        console.log('編輯列', this.isAddMode, row);

        this.editRow = row;
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
        this.isAddMode = true;
        this.modalTitle = '新增資料';
        this.editRow = new UserData();
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
        console.log('get demoDate value=', this.demoDate);
        console.log(this.editRow);

        if (this.isAddMode === true) {
            this.dataService.DoCreate(this.editRow).then((res) => {
                console.log('create res=', res);
                if (res.success === true) {
                    this.QueryData();
                    Swal.fire('訊息提示', '新增成功', 'success');
                    this.editRow = new UserData();
                    // this.modalService.dismissAll('Dismissed after saving data');
                } else {
                    Swal.fire('訊息提示', '新增失敗! ' + res.message, 'error');
                }
            });
        } else {
            // upd
            this.dataService.DoUpdate(this.editRow).then((res) => {
                console.log('DoUpdate res=', res);
                if (res.success === true) {
                    this.QueryData();
                    Swal.fire('訊息提示', '更新成功', 'success');
                } else {
                    Swal.fire('訊息提示', '更新失敗! ' + res.message, 'error');
                }
            });
        }
    }

    doDelete(row) {
        Swal.fire({
            title: '提示視窗',
            text: '確定刪除嗎?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '刪除',
            cancelButtonText: '取消'
        }).then((result) => {
            if (result.value) {
                // call  services  del  method
                this.dataService.DoDelete(row.CustomerID).then((res) => {
                    console.log('Do DoDelete res=', res.success);
                    console.log('res.success type=', typeof res.success);
                    if (res.success === true) {
                        this.QueryData();
                        Swal.fire('訊息提示', '刪除成功', 'success');
                    } else {
                        Swal.fire('訊息提示', '刪除失敗! ' + res.message, 'error');
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    }

    // date picker  改變日期後 監聽回傳DATE
    onChangedDate(chgDate: any) {
        console.log('父組件 收到 demoDate=', chgDate);
        this.demoDate = chgDate;
    }
}
