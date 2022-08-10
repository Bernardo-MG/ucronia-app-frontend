import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navigation-return-button',
  templateUrl: './navigation-return-button.component.html',
  styleUrls: ['./navigation-return-button.component.sass']
})
export class NavigationReturnButtonComponent {

  public backIcon = faArrowLeftLong;

  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

}
