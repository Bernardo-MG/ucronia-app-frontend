import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PaginationNavigationComponent } from './pagination-navigation.component';

describe('PaginationNavigationComponent', () => {
  let component: PaginationNavigationComponent;
  let fixture: ComponentFixture<PaginationNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginationNavigationComponent
      ],
      providers: [
        provideRouter([])
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

  it('should disable backward button when the current page is the first', () => {
    component.current = 1;
    component.pages = 10;

    expect(component.disableBackward).toEqual(true);
  });

  it('should enable backward button when the current page is above the first', () => {
    component.current = 2;
    component.pages = 10;

    expect(component.disableBackward).toEqual(false);
  });

  it('should disable forward button when the current page is the last', () => {
    component.current = 10;
    component.pages = 10;

    expect(component.disableForward).toEqual(true);
  });

  it('should enable forward button when the current page is just before the last', () => {
    component.current = 9;
    component.pages = 10;

    expect(component.disableForward).toEqual(false);
  });

  it('should disable backward button when the current page is the only one', () => {
    component.current = 1;
    component.pages = 1;

    expect(component.disableBackward).toEqual(true);
  });

  it('should disable forward button when the current page is the only one', () => {
    component.current = 1;
    component.pages = 1;

    expect(component.disableForward).toEqual(true);
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

  // **************************************************************************
  // Invalid values
  // **************************************************************************

  it('should mark the component as valid when the inputs are valid', () => {
    component.current = 1;
    component.pages = 10;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    expect(component.invalid).toEqual(false);
  });

  it('should mark the component as invalid when the current page is zero', () => {
    component.current = 0;
    component.pages = 10;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    expect(component.invalid).toEqual(true);
  });

  it('should mark the component as invalid when the current page is above the number of pages', () => {
    component.current = 11;
    component.pages = 10;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    expect(component.invalid).toEqual(true);
  });

  it('should clear the ranges the current page is zero', () => {
    component.current = 0;
    component.pages = 10;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    expect(component.left).toEqual([]);
    expect(component.center).toEqual([]);
    expect(component.right).toEqual([]);
  });

  it('should clear the ranges the current page is above the number of pages', () => {
    component.current = 11;
    component.pages = 10;
    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });
    fixture.detectChanges();

    expect(component.left).toEqual([]);
    expect(component.center).toEqual([]);
    expect(component.right).toEqual([]);
  });

});
