import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconCalendarComponent } from './icon-calendar.component';

describe('IconCalendarComponent', () => {
  let component: IconCalendarComponent;
  let fixture: ComponentFixture<IconCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconCalendarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
