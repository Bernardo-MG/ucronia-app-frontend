import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Configuration } from '@app/configuration/models/configuration';
import { Failure } from '@app/core/api/models/failure';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-configuration-values-editor',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule],
  templateUrl: './configuration-values-editor.component.html'
})
export class ConfigurationValuesEditorComponent {

  @Input() public disabled = false;

  @Input() public configurations: Configuration[] = [];

  @Output() public save = new EventEmitter<Configuration>();

  public activeConfig = '';

  public isFieldInvalid(property: string): boolean {
    return false;
  }

  public onEdit(code: string) {
    this.activeConfig = code;
  }

  public onSave(config: Configuration, event: any) {
    this.activeConfig = '';

    const configuration = new Configuration();
    configuration.code = config.code;
    configuration.type = config.type;
    configuration.value = event.target[config.code].value;
    this.save.emit(configuration);
  }

  public isEditing(code: string): boolean {
    return this.activeConfig === code;
  }

}
