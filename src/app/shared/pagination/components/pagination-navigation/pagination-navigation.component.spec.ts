import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationNavigationTemplateComponent } from '../pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from './pagination-navigation.component';
import { SimpleChange } from '@angular/core';

describe('PaginationNavigationComponent', () => {
  let component: PaginationNavigationComponent;
  let fixture: ComponentFixture<PaginationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PaginationNavigationComponent,
        PaginationNavigationTemplateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationNavigationComponent);
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
  // Current page
  // **************************************************************************

  it('should by default have a current page of 1', () => {
    expect(component.current).toEqual(1);
  });

  it('should not change the current page when going to a page', () => {
    component.current = 1;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    component.onGoTo(5);
    expect(component.current).toEqual(1);
  });

  // **************************************************************************
  // Moving buttons
  // **************************************************************************

  it('should disable backward button when the current page is 1', () => {
    component.current = 1;
    component.pages = 10;

    expect(component.isBackwardDisabled()).toEqual(true);
  });

  it('should enable backward button when the current page is above 1', () => {
    component.current = 2;
    component.pages = 10;

    expect(component.isBackwardDisabled()).toEqual(false);
  });

  it('should disable forward button when the current page is equal to the number of pages', () => {
    component.current = 10;
    component.pages = 10;

    expect(component.isForwardDisabled()).toEqual(true);
  });

  it('should enable forward button when the current page is below the number of pages', () => {
    component.current = 9;
    component.pages = 10;

    expect(component.isForwardDisabled()).toEqual(false);
  });

  // **************************************************************************
  // Ranges
  // **************************************************************************

  it('should change the ranges when setting current pages and total pages', () => {
    component.current = 1;
    component.pages = 10;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    expect(component.left).toEqual([1, 2, 3]);
    expect(component.center).toEqual([]);
    expect(component.right).toEqual([8, 9, 10]);
  });

});
