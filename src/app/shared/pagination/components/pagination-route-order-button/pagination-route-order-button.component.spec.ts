import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Direction } from '@app/core/api/models/direction';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { PaginationOrderButtonComponent } from '../pagination-order-button/pagination-order-button.component';
import { PaginationRouteOrderButtonComponent } from './pagination-route-order-button.component';

describe('PaginationRouteOrderButtonComponent', () => {
  let component: PaginationRouteOrderButtonComponent;
  let fixture: ComponentFixture<PaginationRouteOrderButtonComponent>;
  const activatedRouteQueryParams = new BehaviorSubject(convertToParamMap({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        PaginationRouteOrderButtonComponent,
        PaginationOrderButtonComponent
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
    fixture = TestBed.createComponent(PaginationRouteOrderButtonComponent);
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

    expect(component.direction).toBe(Direction.Unsorted);
  });

  it('should set disabled direction when an empty property is received', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: ''
    }));
    fixture.detectChanges();

    expect(component.direction).toBe(Direction.Unsorted);
  });

  it('should set ascending icon when receiving an ascending property', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: 'property,asc'
    }));
    fixture.detectChanges();

    expect(component.direction).toBe(Direction.Ascending);
  });

  it('should set descending icon when receiving a descending property', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: 'property,desc'
    }));
    fixture.detectChanges();

    expect(component.direction).toBe(Direction.Descending);
  });

});
