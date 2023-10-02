import { Component, OnInit } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';
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

  public failures: { [key: string]: Failure[] } = {};

  public data = new AssociationConfiguration();

  constructor(
    private service: AssociationConfigurationService,
    private authService: AuhtContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authService.hasPermission("association_configuration", "update");

    this.load();
  }

  public onSave(data: AssociationConfiguration): void {
    this.saving = true;
    this.service.update(data).subscribe({
      next: d => {
        this.failures = {};

        // Reload data
        this.load();

        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
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
