import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-failure',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-failure.component.html'
})
export class IconFailureComponent {

  public icon = faX;

}
