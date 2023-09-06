import { Component, OnInit } from '@angular/core';
import { AssociationConfigurationService } from '../../service/association-configuration.service';
import { AssociationConfiguration } from '../../models/association-configuration';

@Component({
  selector: 'assoc-configuration-details',
  templateUrl: './configuration-details.component.html'
})
export class ConfigurationDetailsComponent implements OnInit {

  /**
   * Loading flag.
   */
  public reading = false;

  public configuration = new AssociationConfiguration();

  constructor(
    private service: AssociationConfigurationService
  ) { }

  ngOnInit(): void {
    this.service.get().subscribe({
      next: response => {
        this.configuration = response;

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
