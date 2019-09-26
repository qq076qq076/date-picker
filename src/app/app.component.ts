import { Component } from '@angular/core';
import { DateRange } from './component/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'input-time-picker';
  date = new Date();
  dateRange: DateRange = {
    startDate: new Date(),
    endDate: new Date(),
  };

  onchange() {
    console.log(this.date)
  }

  add() {
    this.date = new Date();
  }

  show() {
    console.log(this.date);
    console.log(this.dateRange);
  }
}
