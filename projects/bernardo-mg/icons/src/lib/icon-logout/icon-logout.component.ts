
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-logout',
    imports: [FontAwesomeModule],
    templateUrl: './icon-logout.component.html'
})
export class IconLogoutComponent {

  public icon = faRightFromBracket;

}
