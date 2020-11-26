import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';

// 引入FormsModule  才可以用雙向數據綁定
import { FormsModule } from '@angular/forms';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BsComponentModule } from '../bs-component/bs-component.module';
import { DatePickerComponent } from '../bs-component/components/date-picker/date-picker.component';
// 引用DatePicker 組件
@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, NgbModule, FormsModule],
    declarations: [TablesComponent, DatePickerComponent] // declarations DatePicker 組件
})
export class TablesModule {}
