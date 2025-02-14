import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-success',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-success.component.html'
})
export class IconSuccessComponent {

  public icon = faCheck;

}
