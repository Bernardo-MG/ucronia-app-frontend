import { Component, Input } from '@angular/core';
import { AssociationConfiguration } from '../../models/association-configuration';

@Component({
  selector: 'assoc-configuration-info',
  templateUrl: './configuration-info.component.html'
})
export class ConfigurationInfoComponent {

  @Input() configuration = new AssociationConfiguration();

}
