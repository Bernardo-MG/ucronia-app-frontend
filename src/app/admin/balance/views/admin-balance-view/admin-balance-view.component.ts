import { Component } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-balance-view',
  templateUrl: './admin-balance-view.component.html',
  styleUrls: ['./admin-balance-view.component.sass']
})
export class AdminBalanceViewComponent {

  public editIcon = faPenToSquare;

  constructor() { }

}
