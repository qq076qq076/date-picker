import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerHeaderComponent } from './date-picker-header.component';

describe('DatePickerHeaderComponent', () => {
  let component: DatePickerHeaderComponent;
  let fixture: ComponentFixture<DatePickerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
