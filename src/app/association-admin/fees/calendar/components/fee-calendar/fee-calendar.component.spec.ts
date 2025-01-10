import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeCalendarComponent } from './fee-calendar.component';

describe('FeeCalendarComponent', () => {
  let component: FeeCalendarComponent;
  let fixture: ComponentFixture<FeeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeCalendarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Disable buttons
  // **************************************************************************

  it('should enable the backward button when the current year is after the start', () => {
    component.range = { years: ["2020", "2021", "2022"] };
    component.year = 2021;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the forward button when the current year is before the end', () => {
    component.range = { years: ["2020", "2021", "2022"] };
    component.year = 2021;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the backward button when the current year is inside the range', () => {
    component.range = { years: ["2019", "2020", "2021"] };
    component.year = 2020;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the forward button when the current year is inside the range', () => {
    component.range = { years: ["2019", "2020", "2021"] };
    component.year = 2020;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button.disabled).toEqual(false);
  });

  // **************************************************************************
  // Hide buttons
  // **************************************************************************

  it('should hide the forward button by default', () => {
    const button = fixture.nativeElement.querySelector('#nextYearButton');

    expect(button).toBeNull();
  });

  it('should hide the backward button by default', () => {
    const button = fixture.nativeElement.querySelector('#previousYearButton');

    expect(button).toBeNull();
  });

  it('should hide the backward button when the current year is before the range', () => {
    component.range = { years: ["2020"] };
    component.year = 2019;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button).toBeNull();
  });

  it('should hide the forward button when the current year is before the range', () => {
    component.range = { years: ["2020"] };
    component.year = 2019;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button).toBeNull();
  });

  it('should hide the backward button when the current year is before the range', () => {
    component.range = { years: ["2020"] };
    component.year = 2021;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button).toBeNull();
  });

  it('should hide the forward button when the current year is before the range', () => {
    component.range = { years: ["2020"] };
    component.year = 2021;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button).toBeNull();
  });

  it('should hide the forward button when the current year is equal to the end', () => {
    component.range = { years: ["2019", "2020"] };
    component.year = 2020;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextYearButton');
    expect(button).toBeNull();
  });

  it('should hide the backward button when the current year is equal to the start', () => {
    component.range = { years: ["2020", "2021"] };
    component.year = 2020;
    component.ngOnChanges({
      range: new SimpleChange(null, component.range, true),
      year: new SimpleChange(null, component.year, true)
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousYearButton');
    expect(button).toBeNull();
  });

});
