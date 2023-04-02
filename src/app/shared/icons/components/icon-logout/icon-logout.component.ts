import { Component } from '@angular/core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-logout',
  templateUrl: './icon-logout.component.html',
  styleUrls: ['./icon-logout.component.sass']
})
export class LogoutIconComponent {

  public icon = faRightFromBracket;

}
