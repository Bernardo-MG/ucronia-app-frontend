import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { PublicActivityCalendarWidgetComponent } from './public-activity-calendar-widget.component';

describe('PublicActivityCalendarWidgetComponent', () => {
  let component: PublicActivityCalendarWidgetComponent;
  let fixture: ComponentFixture<PublicActivityCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PublicActivityCalendarWidgetComponent,
        HttpClientTestingModule
      ],
      providers: [
        FrontpageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicActivityCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
