import { Component, OnInit, forwardRef, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DatePickerComponent } from '../date-picker/date-picker.component';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateRangePickerComponent),
  multi: true
};

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @ViewChild('startPicker', { static: false }) startPicker: DatePickerComponent;
  @ViewChild('endPicker', { static: false }) endPicker: DatePickerComponent;
  onChange: () => void;
  onTouch: () => void;
  dateRange: DateRange;
  constructor(
    // private changeDetectorRef: ChangeDetectorRef
  ) {
    this.dateRange = {
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  set startDate(date: Date) {
    this.dateRange.startDate = date;
    console.log(date)
    // this.changeDetectorRef.markForCheck();
  }

  get startDate() {
    return this.dateRange.startDate;
  }

  set endDate(date: Date) {
    this.dateRange.endDate = date;
    // this.changeDetectorRef.markForCheck();
  }

  get endDate() {
    return this.dateRange.endDate;
  }

  onStartChange() {
    this.endPicker.openCalendar();
  }

  writeValue(obj: any): void {
    this.dateRange = obj;
    if (!this.dateRange) {
      this.dateRange = {
        startDate: new Date(),
        endDate: new Date(),
      };
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
