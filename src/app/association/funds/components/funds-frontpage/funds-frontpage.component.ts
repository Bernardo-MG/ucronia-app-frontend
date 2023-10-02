import { Component, OnInit } from '@angular/core';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'app-transaction-frontpage',
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent implements OnInit {

  public createPermission = false;

  constructor(
    private authService: AuhtContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("transaction", "create");
  }

}
