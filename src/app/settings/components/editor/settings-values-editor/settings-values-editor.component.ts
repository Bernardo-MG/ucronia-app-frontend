import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-settings-values-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule],
  templateUrl: './settings-values-editor.component.html'
})
export class SettingValuesEditorComponent {

  @Input() public disabled = false;

  @Input() public configurations: Setting[] = [];

  @Output() public save = new EventEmitter<Setting>();

  public activeConfig = '';

  public onEdit(code: string) {
    this.activeConfig = code;
  }

  public onSave(config: Setting, event: any) {
    this.activeConfig = '';

    const configuration = new Setting();
    configuration.code = config.code;
    configuration.type = config.type;
    configuration.value = event.target[config.code].value;
    this.save.emit(configuration);
  }

  public isEditing(code: string): boolean {
    return this.activeConfig === code;
  }

}
