import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { FrontpageCalendarComponent } from './frontpage-calendar.component';

describe('FrontpageCalendarComponent', () => {
  let component: FrontpageCalendarComponent;
  let fixture: ComponentFixture<FrontpageCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontpageCalendarComponent,
        HttpClientTestingModule
      ],
      providers: [
        FrontpageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontpageCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
