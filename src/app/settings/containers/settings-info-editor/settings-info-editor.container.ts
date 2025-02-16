import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Setting } from '@app/settings/models/setting';
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

  constructor(
    private service: AssociationSettingsService,
    private authContainer: AuthContainer
  ) { }

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
