import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateRangeComponent),
  multi: true
};

interface DateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements ControlValueAccessor {
  dateRange: DateRange;
  onChange: () => void;
  onTouch: () => void;

  set start(date) {
    this.dateRange.start = date;
  }

  get start() {
    return this.dateRange.start;
  }

  set end(date) {
    this.dateRange.end = date;
  }

  get end() {
    return this.dateRange.end;
  }
  constructor() { }
  writeValue(obj: any): void {
    this.dateRange = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
