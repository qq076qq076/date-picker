import { Component, ViewChildren, OnDestroy, Inject, Host, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDatepicker, DateAdapter, MatCalendar, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-date-picker-header',
  templateUrl: './date-picker-header.component.html',
  styleUrls: ['./date-picker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerHeaderComponent<Moment> implements OnDestroy {
  private destroyed = new Subject<void>();
  @ViewChildren('datePicker') datePicker: MatDatepicker<Moment>;

  get currentView(): string {
    return this.calendar.currentView;
  }

  constructor(
    @Host() private calendar: MatCalendar<Moment>,
    private dateAdapter: DateAdapter<Moment>,
    private datepicker: MatDatepicker<Moment>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get periodLabel() {
    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearA11yLabel)
      .toLocaleUpperCase();
  }

  previousClicked() {
    this.calendar.currentView = 'multi-year';
  }

  toggleYear() {
    if (this.calendar.currentView !== 'multi-year') {
      this.calendar.currentView = 'multi-year';
    } else {
      this.calendar.currentView = 'month';
    }
  }

  closeClicked() {
    this.datepicker.close();
  }
}
