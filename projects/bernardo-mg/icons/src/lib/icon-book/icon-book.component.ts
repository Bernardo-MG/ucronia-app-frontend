import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-book',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-book.component.html'
})
export class IconBookComponent {

  public icon = faBook;

}
