import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, NgbModule],
    declarations: [TablesComponent]
})
export class TablesModule {}
