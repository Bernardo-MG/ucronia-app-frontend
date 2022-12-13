import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminFeeYearViewComponent } from './admin-fee-year-view.component';

describe('AdminFeeYearViewComponent', () => {
  let component: AdminFeeYearViewComponent;
  let fixture: ComponentFixture<AdminFeeYearViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AdminFeeYearViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminFeeYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the forward button by default', () => {
    const button = fixture.nativeElement.querySelector('#feeYearForward');

    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button by default', () => {
    const button = fixture.nativeElement.querySelector('#feeYearBackward');

    expect(button.disabled).toEqual(true);
  });

  it('should disable the forward button when the current year is before the end but it is loading', () => {
    component.range.end = 2020;
    component.year = 2019;
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearForward');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button when the current year is after the start but it is loading', () => {
    component.range.start = 2020;
    component.year = 2021;
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearBackward');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when the current year is before the end', () => {
    component.range.end = 2020;
    component.year = 2019;
    component.loading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearForward');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when the current year is equal to the end', () => {
    component.range.end = 2020;
    component.year = 2020;
    component.loading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearForward');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the forward button when the current year is after the end', () => {
    component.range.end = 2020;
    component.year = 2021;
    component.loading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearForward');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the backward button when the current year is after the start', () => {
    component.range.start = 2020;
    component.year = 2021;
    component.loading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearBackward');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the backward button when the current year is equal to the start', () => {
    component.range.start = 2020;
    component.year = 2020;
    component.loading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearBackward');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button when the current year is before the start', () => {
    component.range.start = 2020;
    component.year = 2019;
    component.loading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#feeYearBackward');
    expect(button.disabled).toEqual(true);
  });

});
