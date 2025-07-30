
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { IconEditComponent } from '@bernardo-mg/icons';

@Component({
  selector: 'assoc-settings-values-editor',
  imports: [FormsModule, ReactiveFormsModule, IconEditComponent],
  templateUrl: './settings-values-editor.component.html'
})
export class SettingValuesEditorComponent {

  public readonly disabled = input(false);

  public readonly settings = input<Setting[]>([]);

  public readonly save = output<Setting>();

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
