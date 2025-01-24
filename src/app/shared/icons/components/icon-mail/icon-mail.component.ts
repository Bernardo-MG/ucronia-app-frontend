import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-mail',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-mail.component.html'
})
export class IconMailComponent {

  public icon = faEnvelope;

}
