import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { IconEditComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'assoc-settings-values-editor',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, IconEditComponent],
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
