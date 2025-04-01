import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamupCalendarComponent } from './teamup-calendar.component';

describe('TeamupCalendarComponent', () => {
  let component: TeamupCalendarComponent;
  let fixture: ComponentFixture<TeamupCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamupCalendarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamupCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
