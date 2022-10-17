import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OrderButtonTemplateComponent } from './order-button-template.component';

describe('OrderButtonTemplateComponent', () => {
  let component: OrderButtonTemplateComponent;
  let fixture: ComponentFixture<OrderButtonTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderButtonTemplateComponent]
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

  it('should send an event to change to ascending direction when clicking for the first time', () => {
    spyOn(component.ascending, 'emit');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(1);
  });

  it('should not send an event to change to descending direction when clicking for the first time', () => {
    spyOn(component.descending, 'emit');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');

    expect(component.descending.emit).toHaveBeenCalledTimes(0);
  });

  it('should send an event to change to descending direction when clicking for the second time', () => {
    spyOn(component.descending, 'emit');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');

    expect(component.descending.emit).toHaveBeenCalledTimes(1);
  });

  it('should not send an additional event to change to ascending direction when clicking for the second time', () => {
    spyOn(component.ascending, 'emit');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(1);
  });

  it('should go back to unsorted when clicking for the third time', () => {
    spyOn(component.ascending, 'emit');
    spyOn(component.descending, 'emit');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(1);
    expect(component.descending.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event to loop back to ascending direction when clicking for the fourth time', () => {
    spyOn(component.ascending, 'emit');

    const option = fixture.debugElement.query(By.css('button'));
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');
    option.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(2);
  });

});
