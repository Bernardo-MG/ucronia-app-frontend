import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamupCalendar } from './teamup-calendar';

describe('TeamupCalendar', () => {
  let component: TeamupCalendar;
  let fixture: ComponentFixture<TeamupCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamupCalendar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamupCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
