import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserData } from '../../model/domain';
import { QueryModel } from '../../model/QueryModel';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    constructor(private dataService: DataService) {}
    queryModel = new QueryModel();
    currentPage = 1;
    pageSize = 10;

    displayedColumns = ['客戶ID', '公司名稱', '城市', '地址', '管理'];
    collectionSize = 0;
    Customers: UserData[];
    JsonData: any;

    ngOnInit() {
        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.collectionSize = res.totalRowCount;
            console.log('init  data source=', res);
            console.log('init Customers=', this.Customers);
        });
    }

    QueryData() {
        this.currentPage = 1;
        this.queryModel.pageIndex = this.currentPage;

        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.collectionSize = res.totalRowCount;
        });
    }

    doEdit(row) {
        console.log('doedit', row);
    }

    public onPageChange(pageNum: any): void {
        // console.log('pageNum=', pageNum);
        this.pageSize = this.pageSize * (pageNum - 1);

        this.currentPage = pageNum;
        this.queryModel.pageIndex = pageNum;

        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.collectionSize = res.totalRowCount;
            console.log('collectionSize=', this.collectionSize);
        });
    }

    public changePagesize(num: number): void {
        this.pageSize = this.pageSize + num;
    }
}
