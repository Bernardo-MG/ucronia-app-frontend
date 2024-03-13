import { Component, OnInit } from '@angular/core';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';
import { throwError } from 'rxjs';
import { AssociationConfiguration } from '../../models/association-configuration';
import { AssociationConfigurationService } from '../../service/association-configuration.service';

@Component({
  selector: 'assoc-configuration-info-editor',
  templateUrl: './configuration-info-editor.component.html'
})
export class ConfigurationInfoEditorComponent extends InfoEditorComponent implements OnInit {

  public data = new AssociationConfiguration();

  constructor(
    private service: AssociationConfigurationService,
    private authContainer: AuthContainer
  ) {
    super();
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("association_configuration", "update");

    this.load();
  }

  public onSave(toSave: AssociationConfiguration): void {
    this.saving = true;
    this.service.update(toSave).subscribe({
      next: d => {
        this.data = d;

        this.failures = new FieldFailures();

        // Reload data
        this.load();

        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

  private load() {
    this.service.get().subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.reading = false;
      },
      error: error => {
        // Reactivate view
        this.reading = false;
      }
    });
  }

}
