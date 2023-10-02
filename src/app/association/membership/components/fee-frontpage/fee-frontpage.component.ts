import { Component, OnInit } from '@angular/core';
import { Active } from '@app/association/membership/models/active';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';


@Component({
  selector: 'assoc-fee-frontpage',
  templateUrl: './fee-frontpage.component.html'
})
export class FeeFrontpageComponent implements OnInit {

  public createPermission = false;

  public activeFilter = Active.Active;

  constructor(
    private authContainer: AuhtContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");
  }

  public onChangeActiveFilter(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'All';
    this.activeFilter = (Active[value] as Active);
  }

}
