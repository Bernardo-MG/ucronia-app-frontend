import { Component } from '@angular/core';
import { UserFeeService } from '../../services/user-fee.service';

@Component({
  selector: 'app-user-fee-frontpage',
  standalone: true,
  imports: [],
  templateUrl: './user-fee-frontpage.component.html'
})
export class UserFeeFrontpageComponent {

  constructor(
    service: UserFeeService
  ) { }

}
