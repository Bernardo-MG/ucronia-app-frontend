
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-search',
    imports: [FontAwesomeModule],
    templateUrl: './icon-search.component.html'
})
export class IconSearchComponent {

  public icon = faMagnifyingGlass;

}
