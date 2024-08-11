import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { FrontpageActivityCalendarComponent } from './frontpage-activity-calendar.component';

describe('FrontpageActivityCalendarComponent', () => {
  let component: FrontpageActivityCalendarComponent;
  let fixture: ComponentFixture<FrontpageActivityCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontpageActivityCalendarComponent,
        HttpClientTestingModule
      ],
      providers: [
        FrontpageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontpageActivityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
