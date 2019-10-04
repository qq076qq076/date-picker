import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true,
};

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Output() update = new EventEmitter();
  @ViewChild('dateRef', { static: false }) datePicker: DatePickerComponent;
  @ViewChild('timeRef', { static: false }) timePicker: TimePickerComponent;
  @Input() datePlaceholder?: string;
  @Input() timePlaceholder?: string;
  onChange: (value) => void;
  onTouched: () => void;
  myDate: Date;
  myTime: string;
  set date(dateTime: Date) {
    if (dateTime) {
      this.myDate = dateTime;
      this.notifyValueChange();
    }
  }

  get date(): Date {
    return this.myDate;
  }

  set time(time: string) {
    if (time) {
      this.myTime = time;
      this.notifyValueChange();
    }
  }

  get time(): string {
    return this.myTime;
  }

  constructor() { }

  notifyValueChange() {
    if (this.onChange) {
      const date = moment(this.myDate).format('YYYY-MM-DD');
      const time = this.myTime.split(':');
      this.onChange(moment(date).set({ hour: +time[0], minute: +time[1] }).toDate());
    }
  }

  changeDate() {
    this.update.emit();
    this.timePicker.openPicker();
  }

  changeTime() {
    this.update.emit();
  }


  writeValue(obj: any): void {
    if (obj) {
      this.myDate = moment(obj).toDate();
      this.myTime = moment(obj).format('H:m');
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
