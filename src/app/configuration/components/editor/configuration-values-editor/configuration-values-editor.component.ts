import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '@app/configuration/models/configuration';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-configuration-values-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule],
  templateUrl: './configuration-values-editor.component.html'
})
export class ConfigurationValuesEditorComponent {

  @Input() public disabled = false;

  @Input() public configurations: Configuration[] = [];

  @Output() public save = new EventEmitter<Configuration>();

  public activeConfig = '';

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
