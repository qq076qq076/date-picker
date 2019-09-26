import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { DatePickerHeaderComponent } from './component/date-picker/date-picker-header/date-picker-header.component';
import { FormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './component/date-range-picker/date-range-picker.component';
import { DateRangeComponent } from './component/date-range/date-range.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    DatePickerHeaderComponent,
    DateRangePickerComponent,
    DateRangeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DatePickerHeaderComponent
  ]
})
export class AppModule { }
