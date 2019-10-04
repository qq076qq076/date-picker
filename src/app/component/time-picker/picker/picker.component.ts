import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { timePickerMaskAnimation } from '../time-picker-animation';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  animations: [
    timePickerMaskAnimation
  ]
})
export class PickerComponent implements OnInit {
  hour;
  minute;

  isOpenTimer = false;
  @Input() set timePickerDate(time: moment.Moment) {
    if (time) {
      this.hour = time.hour();
      this.minute = time.minute();
      this.isOpenTimer = true;
    }
  }
  @Output() addHour = new EventEmitter();
  @Output() subtractHour = new EventEmitter();
  @Output() addMinute = new EventEmitter();
  @Output() subtractMinute = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() closeByMask = new EventEmitter();
  @Output() save = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
