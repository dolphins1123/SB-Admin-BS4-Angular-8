import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    @Input() defaultDate: any;
    @Output() DatePickerChange = new EventEmitter<any>();
    constructor() {}

    ngOnInit() {
        console.log('收到 defaultDate=', this.defaultDate);
    }

    onChangDate(event: any) {
        console.log('  子組件 onChangDate=', event);
        this.DatePickerChange.emit(event);
    }
}
