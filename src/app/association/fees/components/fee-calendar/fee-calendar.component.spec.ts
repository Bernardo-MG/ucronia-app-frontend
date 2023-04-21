import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FeeCalendarComponent } from './fee-calendar.component';

describe('FeeCalendarComponent', () => {
  let component: FeeCalendarComponent;
  let fixture: ComponentFixture<FeeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule
      ],
      declarations: [
        FeeCalendarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Range and buttons

  it('should disable the forward button by default', () => {
    const button = fixture.nativeElement.querySelector('#nextYearButton');

    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button by default', () => {
    const button = fixture.nativeElement.querySelector('#previousYearButton');

    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when the current year is before the end', () => {
    component.end = 2020;
    component.year = 2019;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when the current year is equal to the end', () => {
    component.end = 2020;
    component.year = 2020;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the forward button when the current year is after the end', () => {
    component.end = 2020;
    component.year = 2021;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the backward button when the current year is after the start', () => {
    component.start = 2020;
    component.year = 2021;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the backward button when the current year is equal to the start', () => {
    component.start = 2020;
    component.year = 2020;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button when the current year is before the start', () => {
    component.start = 2020;
    component.year = 2019;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button.disabled).toEqual(true);
  });

});
