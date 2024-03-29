import { Component, OnInit } from '@angular/core';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { throwError } from 'rxjs';
import { AssociationConfiguration } from '../../models/association-configuration';
import { AssociationConfigurationService } from '../../service/association-configuration.service';

@Component({
  selector: 'assoc-configuration-details',
  templateUrl: './configuration-details.component.html'
})
export class ConfigurationDetailsComponent implements OnInit {

  /**
   * Loading flag.
   */
  public reading = false;

  public editing = false;

  public editable = false;

  public saving = false;

  public error = false;

  public failures = new FieldFailures();

  public data = new AssociationConfiguration();

  constructor(
    private service: AssociationConfigurationService,
    private authContainer: AuthContainer
  ) { }

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

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
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
