import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeCalendar } from './fee-calendar';
import { SimpleChange } from '@angular/core';

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
      component.currentYear = 2021;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should enable the forward button when the current year is inside the range', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2021;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should disable the backward button when the current year is equal to the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2020;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should enable the forward button when the current year is equal to the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2020;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should enable the backward button when the current year is equal to the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2022;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeFalse();
    });

    it('should disable the forward button when the current year is equal to the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2022;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the backward button when the current year is before the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2019;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the forward button when the current year is before the start', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2019;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the backward button when the current year is after the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2023;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#previousYearButton button');
      expect(button.disabled).toBeTrue();
    });

    it('should disable the forward button when the current year is after the end', async () => {
      fixture.componentRef.setInput('range', { years: [2020, 2021, 2022] });
      component.currentYear = 2023;

      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#nextYearButton button');
      expect(button.disabled).toBeTrue();
    });

  });

  describe('change year', () => {

    it('should go to a specific year and emit the event', () => {
      spyOn(component.goToYear, 'emit');
      component.currentYear = 2023;

      component.onGoTo({ value: 2020 });

      expect(component.currentYear).toBe(2020);
      expect(component.goToYear.emit).toHaveBeenCalledWith(2020);
    });

    it('should go to the previous year and emit the event', () => {
      spyOn(component.goToYear, 'emit');
      component.currentYear = 2021;
      const range = { years: [2020, 2021, 2022] };
      fixture.componentRef.setInput('range', range);
      component.ngOnChanges({
        range: new SimpleChange(null, range, true)
      });

      component.onGoPrevious();

      expect(component.currentYear).toBe(2020);
      expect(component.goToYear.emit).toHaveBeenCalledWith(2020);
    });

    it('should go to the next year and emit the event', () => {
      spyOn(component.goToYear, 'emit');
      component.currentYear = 2021;
      const range = { years: [2020, 2021, 2022] };
      fixture.componentRef.setInput('range', range);
      component.ngOnChanges({
        range: new SimpleChange(null, range, true)
      });

      component.onGoNext();

      expect(component.currentYear).toBe(2022);
      expect(component.goToYear.emit).toHaveBeenCalledWith(2022);
    });

  });

  describe('support methods', () => {

    it('should check if a month exists in member fees', () => {
      const months = [{ month: new Date(2021, 0, 1), paid: true }];

      expect(component.hasMonth(months, 1)).toBeTrue();
    });

    it('should check if a month doesn\'t exist in member fees', () => {
      const months = [{ month: new Date(2021, 0, 1), paid: true }];

      expect(component.hasMonth(months, 2)).toBeFalse();
    });

    it('should check if a month is paid', () => {
      const months = [{ month: new Date(2021, 0, 1), paid: true }];

      expect(component.isPaid(months, 1)).toBeTrue();
    });

    it('should check if a month is not paid', () => {
      const months = [{ month: new Date(2021, 0, 1), paid: false }];

      expect(component.isPaid(months, 1)).toBeFalse();
    });

    it('should get the correct month date', () => {
      const months = [{ month: new Date(2021, 0, 1), paid: true }];

      expect(component.getMonth(months, 1)).toEqual(new Date(2021, 0, 1));
    });

    it('should disable selection when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.selectionDisabled).toBeTrue();
    });

    it('should disable selection when range is empty', () => {
      fixture.componentRef.setInput('range', { years: [] });
      fixture.detectChanges();
      expect(component.selectionDisabled).toBeTrue();
    });

  });

  it('should emit selectFee event with correct payload', () => {
    spyOn(component.selectFee, 'emit');
    const months = [{ month: new Date(2021, 0, 1), paid: true }];

    component.onSelectFee(123, months, 1);
    expect(component.selectFee.emit).toHaveBeenCalledWith({ member: 123, date: new Date(2021, 0, 1) });
  });

});
