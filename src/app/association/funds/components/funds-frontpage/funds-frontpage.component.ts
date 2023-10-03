import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'app-transaction-frontpage',
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent implements OnInit {

  public createPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("transaction", "create");
  }

}
