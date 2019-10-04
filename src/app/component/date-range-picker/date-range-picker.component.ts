import { Component, forwardRef, ViewChild, Output, EventEmitter, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DatePickerComponent } from '../date-picker/date-picker.component';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateRangePickerComponent),
  multi: true
};

type StartDate = Date | undefined;
type EndDate = Date | undefined;
type DateRange = [StartDate, EndDate];

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @ViewChild('startPicker', { static: false }) startPicker: DatePickerComponent;
  @ViewChild('endPicker', { static: false }) endPicker: DatePickerComponent;
  @Output() update = new EventEmitter();
  @Output() afterClose = new EventEmitter();
  @Input() startPlaceholder?: string;
  @Input() endPlaceholder?: string;
  onChange: (value: DateRange) => void;
  onTouch: () => void;
  myStartDate: StartDate;
  myEndDate: EndDate;
  constructor() { }

  set startDate(date: StartDate) {
    if (date) {
      this.myStartDate = date;
      this.startPicker.markChange();
      this.endPicker.markChange();
      this.notifyValueChange();
    }
  }

  get startDate(): StartDate {
    return this.myStartDate;
  }

  set endDate(date: EndDate) {
    if (date) {
      this.myEndDate = date;
      this.startPicker.markChange();
      this.endPicker.markChange();
      this.notifyValueChange();
    }
  }

  get endDate(): EndDate {
    return this.myEndDate;
  }

  onStartChange() {
    this.endPicker.openCalendar();
    this.notifyRangeUpdate();
  }

  notifyRangeUpdate() {
    if (this.myStartDate && this.myEndDate) {
      const range = [this.myStartDate, this.myEndDate];
      this.update.emit(range);
    }
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange([this.myStartDate, this.myEndDate]);
    }
  }

  writeValue(obj: DateRange): void {
    if (obj) {
      this.myStartDate = obj[0];
      this.myEndDate = obj[1];
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
