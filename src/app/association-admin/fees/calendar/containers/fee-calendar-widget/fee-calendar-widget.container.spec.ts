import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { FeeCalendarWidgetContainer } from './fee-calendar-widget.container';

describe('FeeCalendarWidgetContainer', () => {
  let component: FeeCalendarWidgetContainer;
  let fixture: ComponentFixture<FeeCalendarWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FeeCalendarWidgetContainer
      ],
      providers: [
        FeeCalendarService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeCalendarWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
