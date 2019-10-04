import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  HostListener,
  ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCalendarCellCssClasses, MatDatepicker } from '@angular/material';
import * as  moment from 'moment';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements ControlValueAccessor {
  @ViewChild('picker', { static: false }) picker: MatDatepicker<any>;
  @Output() dateChange = new EventEmitter();
  @Output() afterClose = new EventEmitter();
  @Input() placeholder = '請選擇日期';
  @Input() disabled = false;
  @Input() max?: Date;
  @Input() min?: Date;
  @Input() markStart?: Date;
  @Input() markEnd?: Date;
  onChange: (value: string) => void;
  onTouch: () => void;
  calendarIsOpened = false;
  value: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }
  ondateChange() {
    this.calendarIsOpened = false;
    this.notifyValueChange();
    this.dateChange.emit();
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value): void {
    if (value) {
      this.value = value;
      this.markChange();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  getDateClass() {
    const markStart = this.markStart ? moment(this.markStart) : false;
    const markEnd = this.markEnd ? moment(this.markEnd) : false;
    return (date: Date): MatCalendarCellCssClasses => {
      const dateUnix = moment(date);
      if (markStart && markEnd && dateUnix >= markStart && dateUnix <= markEnd) {
        return {
          'mark-date': true,
          first: dateUnix.format('M-D') === markStart.format('M-D'),
          last: dateUnix.format('M-D') === markEnd.format('M-D'),
        };
      } else {
        return;
      }
    };
  }

  openCalendar() {
    this.picker.open();
  }

  markChange() {
    this.changeDetectorRef.markForCheck();
  }
}
