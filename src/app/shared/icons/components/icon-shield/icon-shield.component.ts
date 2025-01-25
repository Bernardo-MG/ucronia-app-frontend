import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-shield',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-shield.component.html'
})
export class IconShieldComponent {

  public icon = faShield;

}
