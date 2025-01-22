import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-account',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-account.component.html'
})
export class IconAccountComponent {

  public icon = faCircleUser;

}
