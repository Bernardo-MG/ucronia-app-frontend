import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-mail',
  templateUrl: './icon-mail.component.html'
})
export class IconMailComponent {

  public icon = faEnvelope;

}
