import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-account',
    templateUrl: './icon-account.component.html',
    standalone: false
})
export class IconAccountComponent {

  public icon = faCircleUser;

}
