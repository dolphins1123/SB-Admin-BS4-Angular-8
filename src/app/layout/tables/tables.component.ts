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
    queryModel: QueryModel;
    currentPage = 1;
    pageSize = 10;

    displayedColumns = ['客戶ID', '公司名稱', '城市', '地址', '管理'];
    collectionSize = 0;
    Customers: UserData[];
    JsonData: any;

    public onPageChange(pageNum: number): void {
        this.pageSize = this.pageSize * (pageNum - 1);
    }

    public changePagesize(num: number): void {
        this.pageSize = this.pageSize + num;
    }
    ngOnInit() {
        // if (this.queryModel.pageSize == null) {
        //     this.queryModel.pageSize = 10;
        // }
        // if (this.queryModel.pageIndex == null) {
        //     this.queryModel.pageIndex = 1;
        // }

        this.dataService.GetData(this.queryModel).then((res) => {
            this.Customers = res.result;
            this.collectionSize = res.totalRowCount;
            console.log('init  data source=', res);
            console.log('init Customers=', this.Customers);
        });
    }

    qry() {
        // this.queryModel.pageSize = 10;
        // this.queryModel.pageIndex = 2;
        console.log('this.queryModel=', this.queryModel);

        return;
        // const P1 = this.dataService.GetData(this.queryModel);
        // P1.then((res) => {
        //     this.JsonData = res;
        //     console.log('JsonData=', this.JsonData);
        // });
    }

    doEdit(row) {
        console.log('doedit', row);
    }
}
