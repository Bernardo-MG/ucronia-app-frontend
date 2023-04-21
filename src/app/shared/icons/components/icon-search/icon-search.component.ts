import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-search',
  templateUrl: './icon-search.component.html'
})
export class IconSearchComponent {

  public icon = faMagnifyingGlass;

}
