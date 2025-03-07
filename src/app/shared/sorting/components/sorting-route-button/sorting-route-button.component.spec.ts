import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SortingDirection } from '@bernardo-mg/request';
import { BehaviorSubject } from 'rxjs';
import { SortingRouteButtonComponent } from './sorting-route-button.component';

describe('SortingRouteButtonComponent', () => {
  let component: SortingRouteButtonComponent;
  let fixture: ComponentFixture<SortingRouteButtonComponent>;
  const activatedRouteQueryParams = new BehaviorSubject(convertToParamMap({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SortingRouteButtonComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: activatedRouteQueryParams,
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingRouteButtonComponent);
    component = fixture.componentInstance;
    component.property = 'property';
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Route params
  // **************************************************************************

  it('should set disabled direction when no property is received', () => {
    activatedRouteQueryParams.next(convertToParamMap({}));
    fixture.detectChanges();

    expect(component.direction).toBe(SortingDirection.Unsorted);
  });

  it('should set disabled direction when an empty property is received', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: ''
    }));
    fixture.detectChanges();

    expect(component.direction).toBe(SortingDirection.Unsorted);
  });

  it('should set ascending icon when receiving an ascending property', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: 'property,asc'
    }));
    fixture.detectChanges();

    expect(component.direction).toBe(SortingDirection.Ascending);
  });

  it('should set descending icon when receiving a descending property', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: 'property,desc'
    }));
    fixture.detectChanges();

    expect(component.direction).toBe(SortingDirection.Descending);
  });

});
