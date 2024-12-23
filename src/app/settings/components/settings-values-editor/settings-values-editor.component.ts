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

  @Input() public settings: Setting[] = [];

  @Output() public save = new EventEmitter<Setting>();

  public activeConfig = '';

  public onEdit(code: string) {
    this.activeConfig = code;
  }

  public onSave(config: Setting, event: any) {
    this.activeConfig = '';

    const setting = new Setting();
    setting.code = config.code;
    setting.type = config.type;
    setting.value = event.target[config.code].value;
    this.save.emit(setting);
  }

  public isEditing(code: string): boolean {
    return this.activeConfig === code;
  }

}
