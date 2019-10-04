import {
  Component,
  forwardRef,
  Input,
  Output, EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as  moment from 'moment';
import { timePickerMaskAnimation } from './time-picker-animation';
import { PickerComponent } from './picker/picker.component';

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
  outDate: string;
  pickerRef;
  pickerInstance;
  timePickerDate: moment.Moment;
  onChange: (value) => void;
  onTouch: () => void;
  @Input() hideButton?: boolean;
  @Input() placeholder?: string;
  @Output() afterUpdate = new EventEmitter();
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }

  openPicker() {
    this.timePickerDate = this.outDate ? moment(this.outDate, 'HH:mm') : moment();
    this.open();
  }

  private open() {
    this.pickerRef = this.componentFactoryResolver.resolveComponentFactory(PickerComponent).create(this.injector);
    this.pickerInstance = this.pickerRef.instance;
    this.applicationRef.attachView(this.pickerRef.hostView);

    this.pickerInstance.timePickerDate = this.timePickerDate;
    this.pickerInstance.addHour.subscribe(() => {
      this.timePickerDate.add(1, 'hour');
      this.pickerInstance.timePickerDate = this.timePickerDate;
    });
    this.pickerInstance.subtractHour.subscribe(() => {
      this.timePickerDate.subtract(1, 'hour');
      this.pickerInstance.timePickerDate = this.timePickerDate;
    });
    this.pickerInstance.addMinute.subscribe(() => {
      this.timePickerDate.add(1, 'minute');
      this.pickerInstance.timePickerDate = this.timePickerDate;
    });
    this.pickerInstance.subtractMinute.subscribe(() => {
      this.timePickerDate.subtract(1, 'minute');
      this.pickerInstance.timePickerDate = this.timePickerDate;
    });
    this.pickerInstance.close.subscribe(() => {
      this.close();
    });
    this.pickerInstance.closeByMask.subscribe(() => {
      this.close();
      if (this.hideButton) {
        this.save();
      }
    });
    this.pickerInstance.save.subscribe(() => {
      this.save();
      this.close();
    });

    const domElem = (this.pickerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  private close() {
    this.applicationRef.detachView(this.pickerRef.hostView);
    this.changeDetectorRef.markForCheck();
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
