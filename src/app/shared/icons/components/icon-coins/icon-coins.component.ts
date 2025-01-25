import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-coins',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-coins.component.html'
})
export class IconCoinsComponent {

  public icon = faCoins;

}
