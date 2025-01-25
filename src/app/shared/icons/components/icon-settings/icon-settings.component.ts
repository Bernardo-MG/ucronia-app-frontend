import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-settings',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-settings.component.html'
})
export class IconSettingsComponent {

  public icon = faGear;

}
