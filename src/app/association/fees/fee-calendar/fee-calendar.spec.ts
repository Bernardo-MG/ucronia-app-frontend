import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeCalendar } from './fee-calendar';

describe('FeeCalendar', () => {
  let component: FeeCalendar;
  let fixture: ComponentFixture<FeeCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeCalendar
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('button enable status', () => {

    it('should enable the backward button when the current year is inside the range', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2021;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should enable the forward button when the current year is inside the range', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2021;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should disable the backward button when the current year is equal to the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2020;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should enable the forward button when the current year is equal to the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2020;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should enable the backward button when the current year is equal to the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2022;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should disable the forward button when the current year is equal to the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2022;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the backward button when the current year is before the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2019;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the forward button when the current year is before the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2019;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the backward button when the current year is after the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2023;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the forward button when the current year is after the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.year = 2023;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeTrue();
    });

  });

});
