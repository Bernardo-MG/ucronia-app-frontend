import { Component } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-book',
    templateUrl: './icon-book.component.html',
    standalone: false
})
export class IconBookComponent {

  public icon = faBook;

}
