import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../model/domain';
import { QueryModel } from '../model/QueryModel';
@Injectable({
    providedIn: 'root'
})
export class DataService implements OnInit {
    jsonData: any;
    UserDatas: UserData[] = [];

    queryModel: QueryModel;
    constructor(private http: HttpClient) {}
    ngOnInit() {}

    // QueryJsonData(model: QueryModel): any {
    //     const p1 = this.GetData(model);

    //     Promise.all([p1]).then((values) => {
    //         console.log('p1=', values[0]); // [3, 1337, "foo"]
    //         this.jsonData = values[0];
    //         console.log('jsonData 1=', this.jsonData);
    //     });
    //     console.log('QueryJsonData p1=', p1);
    //     return this.jsonData;
    // }

    async GetData(model: QueryModel) {
        const data: any = await this.GetJSONData(model);
        console.log(' GetDataGetData() data=', data);
        return data;
    }

    GetJSONData(model: QueryModel): any {
        // this.queryModel.pageSize = 10;
        // this.queryModel.pageIndex = 1;
        //  const url = `http://127.0.0.1/crud/GetList?model.pageSize=${model.pageSize}&model.pageIndex=${model.pageIndex}`;
        const url = `http://127.0.0.1/crud/GetList?model.pageSize=10&model.pageIndex=1`;
        const data = this.http.get<any>(url).toPromise();
        return data;
    }
}
