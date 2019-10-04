import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './component/date-range-picker/date-range-picker.component';
import { DateRangeComponent } from './component/date-range/date-range.component';
import { TimePickerBoxComponent } from './component/time-picker/time-picker-box/time-picker-box.component';
import { TimePickerComponent } from './component/time-picker/time-picker.component';
import { DateTimePickerComponent } from './component/date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    DateRangeComponent,
    TimePickerComponent,
    TimePickerBoxComponent,
    DateTimePickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
