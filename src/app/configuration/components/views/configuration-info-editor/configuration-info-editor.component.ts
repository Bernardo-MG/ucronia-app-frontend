import { Component, OnInit } from '@angular/core';
import { Configuration } from '@app/configuration/models/configuration';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AssociationConfigurationService } from '../../../service/association-configuration.service';
import { ConfigurationValuesEditorComponent } from '../../editor/configuration-values-editor/configuration-values-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'assoc-configuration-info-editor',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ArticleComponent, ConfigurationValuesEditorComponent],
  templateUrl: './configuration-info-editor.component.html'
})
export class ConfigurationInfoEditorComponent implements OnInit {

  public configurations: Configuration[] = [];

  public editable = false;

  constructor(
    private service: AssociationConfigurationService,
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("association_configuration", "update");

    this.service.getAll()
      .subscribe({
        next: response => {
          this.configurations = response;
        },
        error: error => {
        }
      });
  }

  public onSaveConfig(config: Configuration) {
    return this.service.update(config.code, config).subscribe({
      next: response => {
      },
      error: error => {
      }
    });
  }

}
