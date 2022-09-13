import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

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

  it('should send an event to change to descending direction when clicking for the first time', () => {
    spyOn(component, 'descending');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');

    expect(component.descending).toHaveBeenCalled(); 
  });

  it('should send an event to change to descending direction when clicking for the second time', () => {
    spyOn(component, 'ascending');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');

    expect(component.ascending).toHaveBeenCalled(); 
  });

});
