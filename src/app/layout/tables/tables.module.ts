import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';

// 引入FormsModule  才可以用雙向數據綁定
import { FormsModule } from '@angular/forms';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, NgbModule, FormsModule],
    declarations: [TablesComponent]
})
export class TablesModule {}
