import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormControlsComponent } from './form-controls.component';

describe('FormControlsComponent', () => {
  let component: FormControlsComponent;
  let fixture: ComponentFixture<FormControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormControlsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create the save button where there are no save observers', () => {
    const option = fixture.debugElement.query(By.css('#save'));
    expect(option).toBeFalsy();
  });

  it('should not create the delete button where there are no delete observers', () => {
    const option = fixture.debugElement.query(By.css('#delete'));
    expect(option).toBeFalsy();
  });

  it('should not create the add button where there are no add observers', () => {
    const option = fixture.debugElement.query(By.css('#add'));
    expect(option).toBeFalsy();
  });

  it('should create the save button where there are save observers', () => {
    component.save.subscribe(d => d);
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('#save'));
    expect(option).toBeTruthy();
  });

  it('should create the delete button where there are delete observers', () => {
    component.delete.subscribe(d => d);
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('#delete'));
    expect(option).toBeTruthy();
  });

  it('should create the add button where there are add observers', () => {
    component.add.subscribe(d => d);
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('#add'));
    expect(option).toBeTruthy();
  });

  it('should send only an event to save when clicking the save button', () => {
    component.save.subscribe(d => d);
    fixture.detectChanges();

    spyOn(component.save, 'emit');
    spyOn(component.delete, 'emit');
    spyOn(component.add, 'emit');

    const option = fixture.debugElement.query(By.css('#save'));
    option.triggerEventHandler('click');

    expect(component.save.emit).toHaveBeenCalled();

    expect(component.delete.emit).not.toHaveBeenCalled();
    expect(component.add.emit).not.toHaveBeenCalled();
  });

  it('should send only an event to delete when clicking the delete button', () => {
    component.delete.subscribe(d => d);
    fixture.detectChanges();

    spyOn(component.save, 'emit');
    spyOn(component.delete, 'emit');
    spyOn(component.add, 'emit');

    const option = fixture.debugElement.query(By.css('#delete'));
    option.triggerEventHandler('click');

    expect(component.delete.emit).toHaveBeenCalled();

    expect(component.save.emit).not.toHaveBeenCalled();
    expect(component.add.emit).not.toHaveBeenCalled();
  });

  it('should disable the save button when saving is disabled', () => {
    component.save.subscribe(d => d);
    component.disabledSave = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#save');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the save button when saving is enabled', () => {
    component.save.subscribe(d => d);
    component.disabledSave = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#save');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the save button by default', () => {
    component.save.subscribe(d => d);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#save');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the delete button when deleting is disabled', () => {
    component.delete.subscribe(d => d);
    component.disabledDelete = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#delete');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the delete button when deleting is enabled', () => {
    component.delete.subscribe(d => d);
    component.disabledDelete = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#delete');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the delete button by default', () => {
    component.delete.subscribe(d => d);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#delete');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the add button when adding is disabled', () => {
    component.add.subscribe(d => d);
    component.disabledAdd = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#add');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the add button when adding is enabled', () => {
    component.add.subscribe(d => d);
    component.disabledAdd = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#add');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the add button by default', () => {
    component.add.subscribe(d => d);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#add');
    expect(button.disabled).toEqual(false);
  });

});
