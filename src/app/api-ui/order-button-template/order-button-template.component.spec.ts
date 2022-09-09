import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderButtonTemplateComponent } from './order-button-template.component';

describe('OrderButtonTemplateComponent', () => {
  let component: OrderButtonTemplateComponent;
  let fixture: ComponentFixture<OrderButtonTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderButtonTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderButtonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
