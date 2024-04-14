import { Component, OnInit } from '@angular/core';
import { Configuration } from '@app/association/configuration/models/configuration';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { Observable } from 'rxjs';
import { AssociationConfiguration } from '../../../models/association-configuration';
import { AssociationConfigurationService } from '../../../service/association-configuration.service';
import { ConfigurationValuesEditorComponent } from '../../editor/configuration-values-editor/configuration-values-editor.component';
import { ConfigurationFormComponent } from '../../form/configuration-form/configuration-form.component';
import { ConfigurationInfoComponent } from '../../info/configuration-info/configuration-info.component';

@Component({
  selector: 'assoc-configuration-info-editor',
  standalone: true,
  imports: [ConfigurationFormComponent, ConfigurationInfoComponent, ArticleComponent, EditionWrapperComponent, ConfigurationValuesEditorComponent],
  templateUrl: './configuration-info-editor.component.html'
})
export class ConfigurationInfoEditorComponent extends InfoEditorComponent<AssociationConfiguration> implements OnInit {

  public configurations: Configuration[] = [];

  constructor(
    private service: AssociationConfigurationService,
    private authContainer: AuthContainer
  ) {
    super(new AssociationConfiguration());
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("association_configuration", "update");

    this.load();
    
    this.service.getAll()
      .subscribe({
        next: response => {
          this.configurations = response;
        },
        error: error => {
        }
      });
  }

  protected override delete(): void {
    throw new Error('Method not implemented.');
  }

  protected override read(): Observable<AssociationConfiguration> {
    return this.service.get();
  }

  protected override save(toSave: AssociationConfiguration): Observable<AssociationConfiguration> {
    return this.service.update(toSave);
  }

}
