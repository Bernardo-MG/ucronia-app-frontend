import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-success',
  templateUrl: './icon-success.component.html'
})
export class IconSuccessComponent {

  public icon = faCheck;

}
