import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Configuration } from '@app/configuration/models/configuration';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ConfigurationValuesEditorComponent } from './configuration-values-editor.component';

describe('ConfigurationValuesEditorComponent', () => {
  let component: ConfigurationValuesEditorComponent;
  let fixture: ComponentFixture<ConfigurationValuesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        IconsModule,
        ConfigurationValuesEditorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationValuesEditorComponent);
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
    const config: Configuration = { code: 'config1', type: 'text', value: 'value1' };
    spyOn(component.save, 'emit');

    component.onSave(config, { target: { 'config1': { value: 'new value' } } });

    expect(component.save.emit).toHaveBeenCalledWith(jasmine.objectContaining({ code: 'config1', type: 'text', value: 'new value' }));
  });

});
