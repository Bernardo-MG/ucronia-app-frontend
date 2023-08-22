import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { PaginationOrderButtonTemplateComponent } from '../pagination-order-button-template/pagination-order-button-template.component';
import { PaginationOrderButtonComponent } from './pagination-order-button.component';
import { Direction } from '@app/core/api/models/direction';

describe('PaginationOrderButtonComponent', () => {
  let component: PaginationOrderButtonComponent;
  let fixture: ComponentFixture<PaginationOrderButtonComponent>;
  const activatedRouteQueryParams = new BehaviorSubject(convertToParamMap({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        PaginationOrderButtonComponent,
        PaginationOrderButtonTemplateComponent
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
    fixture = TestBed.createComponent(PaginationOrderButtonComponent);
    component = fixture.componentInstance;
    component.property = 'property';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
