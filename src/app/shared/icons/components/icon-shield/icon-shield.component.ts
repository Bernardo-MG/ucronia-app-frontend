import { Component } from '@angular/core';
import { faShield } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-shield',
    templateUrl: './icon-shield.component.html',
    standalone: false
})
export class IconShieldComponent {

  public icon = faShield;

}
