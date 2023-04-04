import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { OrderButtonTemplateComponent } from '../../components/button-order-template/button-order-template.component';
import { OrderButtonComponent } from './button-order.component';

describe('OrderButtonComponent', () => {
  let component: OrderButtonComponent;
  let fixture: ComponentFixture<OrderButtonComponent>;
  const activatedRouteQueryParams = new BehaviorSubject(convertToParamMap({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        OrderButtonComponent,
        OrderButtonTemplateComponent
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
    fixture = TestBed.createComponent(OrderButtonComponent);
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

    expect(component.direction).toBe('unsorted');
  });

  it('should set disabled direction when an empty property is received', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: ''
    }));
    fixture.detectChanges();

    expect(component.direction).toBe('unsorted');
  });

  it('should set ascending icon when receiving an ascending property', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: 'property,asc'
    }));
    fixture.detectChanges();

    expect(component.direction).toBe('asc');
  });

  it('should set descending icon when receiving a descending property', () => {
    activatedRouteQueryParams.next(convertToParamMap({
      sort: 'property,desc'
    }));
    fixture.detectChanges();

    expect(component.direction).toBe('desc');
  });

});
