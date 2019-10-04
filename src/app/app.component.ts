import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'input-time-picker';
  date = '2019-10-02T01:10:21.834Z';
  date2 = '2019-10-02T01:10:21.834Z';
  dateRange = [moment().toDate(), moment().add(1, 'month').toDate()];
  time;

  onchange() {
    console.log(this.dateRange)
  }

  add() {
    // this.date = new Date();
  }

  show() {
    console.log(this.date);
  }

  changeTime() {
    // console.log('changeTime')
    console.log(this.date, this.time)
  }

  change() {
    this.time = moment('2019/1/1 2:34').toDate();
  }

  console(e) {
    console.log(e)
  }

  toString(val) {
    return JSON.stringify(val)
  }
}
