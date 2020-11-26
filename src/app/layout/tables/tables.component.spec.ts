import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TablesComponent } from './tables.component';
import { TablesModule } from './tables.module';
import { BsComponentComponent } from '../bs-component/bs-component.component';

describe('TablesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TablesModule, RouterTestingModule, BsComponentComponent]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(TablesComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
