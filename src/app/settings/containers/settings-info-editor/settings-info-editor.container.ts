import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ArticleComponent, CardBodyComponent, CardComponent } from '@bernardo-mg/layout';
import { SettingValuesEditorComponent } from '../../components/settings-values-editor/settings-values-editor.component';
import { AssociationSettingsService } from '../../service/association-settings.service';

@Component({
    selector: 'assoc-settings-info-editor',
    imports: [ReactiveFormsModule, FormsModule, ArticleComponent, SettingValuesEditorComponent, CardComponent, CardBodyComponent],
    templateUrl: './settings-info-editor.container.html'
})
export class SettingsInfoEditorContainer implements OnInit {

  public settings: Setting[] = [];

  public editable = false;

  private service = inject(AssociationSettingsService);

  private authContainer = inject(AuthContainer);

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("association_settings", "update");

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
