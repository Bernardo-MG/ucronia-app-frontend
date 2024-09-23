import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SettingValuesEditorComponent } from './settings-values-editor.component';

describe('SettingValuesEditorComponent', () => {
  let component: SettingValuesEditorComponent;
  let fixture: ComponentFixture<SettingValuesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IconsModule,
        SettingValuesEditorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingValuesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate editing', () => {
    component.onEdit('config1');
    expect(component.isEditing('config1')).toBeTruthy();
  });

  it('should deactivate editing after save', () => {
    component.onEdit('config1');
    component.onSave({ code: 'config1', type: 'text', value: 'value1' }, { target: { 'config1': { value: 'new value' } } });
    expect(component.isEditing('config1')).toBeFalsy();
  });

  it('should emit configuration on save', () => {
    const config: Setting = { code: 'config1', type: 'text', value: 'value1' };
    spyOn(component.save, 'emit');

    component.onSave(config, { target: { 'config1': { value: 'new value' } } });

    expect(component.save.emit).toHaveBeenCalledWith(jasmine.objectContaining({ code: 'config1', type: 'text', value: 'new value' }));
  });

});
