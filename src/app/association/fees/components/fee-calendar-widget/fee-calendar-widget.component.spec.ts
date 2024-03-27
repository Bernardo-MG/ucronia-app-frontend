import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCalendarWidgetComponent } from './fee-calendar-widget.component';

describe('FeeCalendarWidgetComponent', () => {
  let component: FeeCalendarWidgetComponent;
  let fixture: ComponentFixture<FeeCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeCalendarWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
