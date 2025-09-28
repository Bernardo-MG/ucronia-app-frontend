
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-settings-values-editor',
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './settings-values-editor.html'
})
export class SettingValuesEditor {

  public readonly disabled = input(false);

  public readonly settings = input<Setting[]>([]);

  public readonly failures = input(new FailureStore());

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
