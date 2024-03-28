import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { AssociationConfiguration } from '../../models/association-configuration';
import { AssociationConfigurationService } from '../../service/association-configuration.service';
import { ConfigurationFormComponent } from '../configuration-form/configuration-form.component';
import { ConfigurationInfoComponent } from '../configuration-info/configuration-info.component';

@Component({
  selector: 'assoc-configuration-info-editor',
  standalone: true,
  imports: [LayoutModule, ConfigurationFormComponent, ConfigurationInfoComponent],
  templateUrl: './configuration-info-editor.component.html'
})
export class ConfigurationInfoEditorComponent extends InfoEditorComponent<AssociationConfiguration> implements OnInit {

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
