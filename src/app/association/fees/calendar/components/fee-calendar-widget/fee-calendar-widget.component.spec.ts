import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeCalendarService } from '../../../core/services/fee-calendar.service';
import { FeeCalendarWidgetComponent } from './fee-calendar-widget.component';

describe('FeeCalendarWidgetComponent', () => {
  let component: FeeCalendarWidgetComponent;
  let fixture: ComponentFixture<FeeCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FeeCalendarWidgetComponent
      ],
      providers: [
        FeeCalendarService
      ]
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
