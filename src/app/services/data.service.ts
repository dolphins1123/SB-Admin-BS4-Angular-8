import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../model/domain';
import { QueryModel } from '../model/QueryModel';

@Injectable({
    providedIn: 'root'
})

// TODO   TOKEN AUTH
export class DataService implements OnInit {
    jsonData: any;
    
    queryModel: QueryModel;
    constructor(private http: HttpClient) {}
    ngOnInit() {}

    public async GetData(model: QueryModel) {
        console.log(' GetData model=', model);
        const data: any = await this.GetJSONData(model);
        console.log(' GetDataGetData() data=', data);
        return data;
    }
    public async DoCreate(model: UserData) {
        const data: any = await this.CreateData(model);
        console.log(' DoCreate() data=', data);
        return data;
    }
    public async DoUpdate(model: UserData) {
        const data: any = await this.UpdateData(model);
        console.log(' DoUpdate() data=', data);
        return data;
    }
    // ---------------------------------------
    private GetJSONData(model: QueryModel): any {
        console.log(' GetJSONData model=', model);
        const url = `http://127.0.0.1/crud/GetList?model.pageSize=${model.pageSize}&model.pageIndex=${model.pageIndex}`;

        const data = this.http.get<any>(url).toPromise();
        return data;
    }

    private CreateData(model: UserData): any {
        console.log(' GetJSONData model=', model);
        const url = 'http://127.0.0.1/crud/api/Customer/Create';

        const data = this.http.post<any>(url, model).toPromise();
        return data;
    }

    private UpdateData(model: UserData): any {
        console.log(' GetJSONData model=', model);
        const url = 'http://127.0.0.1/crud/api/Customer/Update';

        const data = this.http.post<any>(url, model).toPromise();
        return data;
    }
}
