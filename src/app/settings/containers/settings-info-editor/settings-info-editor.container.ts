
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ArticleComponent } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SettingValuesEditorComponent } from '../../components/settings-values-editor/settings-values-editor.component';
import { AssociationSettingsService } from '../../service/association-settings.service';

@Component({
  selector: 'assoc-settings-info-editor',
  imports: [CardModule, ReactiveFormsModule, FormsModule, ArticleComponent, SettingValuesEditorComponent],
  templateUrl: './settings-info-editor.container.html'
})
export class SettingsInfoEditorContainer {

  public settings: Setting[] = [];

  public readonly editable;

  private readonly service = inject(AssociationSettingsService);

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.editable = authContainer.hasPermission("association_settings", "update");

    this.service.getAll()
      .subscribe({
        next: response => {
          this.settings = response;
        },
        error: error => {
        }
      });
  }

  public onSaveConfig(config: Setting) {
    return this.service.update(config.code, config).subscribe({
      next: response => {
      },
      error: error => {
      }
    });
  }

}
