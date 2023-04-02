import { Component } from '@angular/core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logout-icon',
  templateUrl: './logout-icon.component.html',
  styleUrls: ['./logout-icon.component.sass']
})
export class LogoutIconComponent {

  public icon = faRightFromBracket;

}
