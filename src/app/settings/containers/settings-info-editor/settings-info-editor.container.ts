import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Setting } from '@app/settings/models/setting';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AssociationSettingsService as AssociationSettingsService } from '../../service/association-settings.service';
import { SettingValuesEditorComponent } from '../../components/settings-values-editor/settings-values-editor.component';

@Component({
  selector: 'assoc-settings-info-editor',
  standalone: true,
  imports: [CardModule, ReactiveFormsModule, FormsModule, ArticleComponent, SettingValuesEditorComponent],
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
