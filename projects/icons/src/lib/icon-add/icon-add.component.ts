import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-add',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icon-add.component.html'
})
export class IconAddComponent {

  public icon = faPlus;

}
