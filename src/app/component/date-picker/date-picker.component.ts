import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewChild, Output, EventEmitter, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCalendarCellCssClasses, MatDatepicker } from '@angular/material';
import * as  moment from 'moment';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
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
  @Input() placeholder = '請選擇日期';
  @Input() disabled = false;
  @Input() max?: Date;
  @Input() min?: Date;
  @Input() markStart?: Date;
  @Input() markEnd?: Date;
  @Input() isOpened?: boolean;
  onChange: (value: string) => void;
  onTouch: () => void;
  calendarIsOpened = false;
  myValue: string;

  get value() {
    return this.myValue;
  }

  set value(value: string) {
    this.myValue = value;
    this.changeDetectorRef.markForCheck();
    this.notifyValueChange();
  }

  @HostListener('document:click', ['$event']) clickOut(event) {
    // 在打開的狀態 點擊外面就直接關閉
    if (!this.elementRef.nativeElement.contains(event.target) && this.calendarIsOpened) {
      this.closeCalendar();
    }
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) { }

  ondateChange() {
    this.dateChange.emit();
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.myValue);
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  getDateClass() {
    const markStart = this.markStart ? moment(this.markStart).format('M-D') : false;
    const markEnd = this.markEnd ? moment(this.markEnd).format('M-D') : false;
    return (date: Date): MatCalendarCellCssClasses => {
      const dateUnix = moment(date).format('M-D');
      if (markStart && markEnd && dateUnix >= markStart && dateUnix <= markEnd) {
        return {
          'mark-date': true,
          first: dateUnix === markStart,
          last: dateUnix === markEnd,
        };
      } else {
        return;
      }
    };
  }

  openCalendar() {
    this.calendarIsOpened = true;
  }

  closeCalendar() {
    this.calendarIsOpened = false;
  }
}
