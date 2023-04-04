import { Component } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-settings',
  templateUrl: './icon-settings.component.html',
  styleUrls: ['./icon-settings.component.sass']
})
export class IconSettingsComponent {

  public icon = faGear;

}
