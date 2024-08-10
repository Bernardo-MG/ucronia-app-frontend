import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { FrontpageActivityCalendarWidgetComponent } from './frontpage-activity-calendar.component';

describe('FrontpageActivityCalendarWidgetComponent', () => {
  let component: FrontpageActivityCalendarWidgetComponent;
  let fixture: ComponentFixture<FrontpageActivityCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontpageActivityCalendarWidgetComponent,
        HttpClientTestingModule
      ],
      providers: [
        FrontpageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontpageActivityCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
