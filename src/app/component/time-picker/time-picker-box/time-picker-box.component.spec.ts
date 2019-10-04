import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerBoxComponent } from './time-picker-box.component';

describe('TimePickerBoxComponent', () => {
  let component: TimePickerBoxComponent;
  let fixture: ComponentFixture<TimePickerBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
