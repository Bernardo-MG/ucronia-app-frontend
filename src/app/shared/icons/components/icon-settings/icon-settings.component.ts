import { Component } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-settings',
    templateUrl: './icon-settings.component.html',
    standalone: false
})
export class IconSettingsComponent {

  public icon = faGear;

}
