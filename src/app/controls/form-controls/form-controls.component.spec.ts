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

  it('should send only an event to save when clicking the save button', () => {
    spyOn(component.save, 'emit');
    spyOn(component.delete, 'emit');

    const option = fixture.debugElement.query(By.css('#save'));
    option.triggerEventHandler('click');

    expect(component.save.emit).toHaveBeenCalled();

    expect(component.delete.emit).not.toHaveBeenCalled();
  });

  it('should send only an event to delete when clicking the delete button', () => {
    spyOn(component.save, 'emit');
    spyOn(component.delete, 'emit');

    const option = fixture.debugElement.query(By.css('#delete'));
    option.triggerEventHandler('click');

    expect(component.delete.emit).toHaveBeenCalled();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should disable the save button when saving is disabled', () => {
    component.disabledSave = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#save');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the save button when saving is enabled', () => {
    component.disabledSave = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#save');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the save button by default', () => {
    const button = fixture.nativeElement.querySelector('#save');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the delete button when saving is disabled', () => {
    component.disabledDelete = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#delete');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the delete button when saving is enabled', () => {
    component.disabledDelete = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#delete');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the delete button by default', () => {
    const button = fixture.nativeElement.querySelector('#delete');
    expect(button.disabled).toEqual(false);
  });

});
