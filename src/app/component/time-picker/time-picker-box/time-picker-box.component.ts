import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-time-picker-box',
  templateUrl: './time-picker-box.component.html',
  styleUrls: ['./time-picker-box.component.scss']
})
export class TimePickerBoxComponent {
  @Output() timeChange = new EventEmitter<string>();
  @Output() add = new EventEmitter();
  @Output() subtract = new EventEmitter();
  @Input() get time() {
    return this.value;
  }

  set time(value) {
    this.value = this.paddingLeft(value.toString(), 2);
    this.timeChange.emit(this.value);
  }
  value: string;
  constructor() { }


  private paddingLeft(str, lenght) {
    if (str.length >= lenght) {
      return str;
    } else {
      return this.paddingLeft('0' + str, lenght);
    }
  }
}

