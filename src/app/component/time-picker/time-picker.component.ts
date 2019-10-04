import { Component, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Moment } from 'moment';
import * as  moment from 'moment';
import { timePickerMaskAnimation } from './time-picker-animation';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimePickerComponent),
  multi: true
};

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    timePickerMaskAnimation
  ]
})
export class TimePickerComponent implements ControlValueAccessor {
  isOpenTimer = false;
  timePickerDate: Moment = moment();
  outDate: string;
  onChange: (value) => void;
  onTouch: () => void;
  @Input() hideButton?: boolean;
  @Input() placeholder?: string;
  @Output() afterUpdate = new EventEmitter();
  get hour() {
    return this.timePickerDate.hour();
  }

  get minute() {
    return this.timePickerDate.minute();
  }
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  openPicker() {
    this.toggleOpen(true);
    if (this.outDate) {
      this.timePickerDate = moment(this.outDate, 'HH:mm');
    }
  }

  toggleOpen(isOpen: boolean) {
    this.isOpenTimer = isOpen;
    this.changeDetectorRef.markForCheck();
  }

  addHour() {
    this.timePickerDate.add(1, 'hour');
  }

  subtractHour() {
    this.timePickerDate.subtract(1, 'hour');
  }

  addMinute() {
    this.timePickerDate.add(1, 'minute');
  }

  subtractMinute() {
    this.timePickerDate.subtract(1, 'minute');
  }

  close() {
    this.toggleOpen(false);
  }

  closeByMask() {
    this.close();
    if (this.hideButton) {
      this.save();
    }
  }

  saveButton() {
    this.save();
    this.close();
  }

  private save() {
    this.outDate = this.timePickerDate.format('HH:mm');
    if (this.onChange) {
      this.onChange(this.outDate);
    }
    this.afterUpdate.emit();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.outDate = moment(obj, 'H:m').format('HH:mm');
      this.changeDetectorRef.markForCheck();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
