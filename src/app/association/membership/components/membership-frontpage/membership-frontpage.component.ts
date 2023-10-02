import { Component, OnInit } from '@angular/core';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';
import { Active } from '../../models/active';

@Component({
  selector: 'assoc-membership-frontpage',
  templateUrl: './membership-frontpage.component.html'
})
export class MembershipFrontpageComponent implements OnInit {

  public createPermission = false;

  public activeFilter = Active.Active;

  constructor(
    private authService: AuhtContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("member", "create");
  }

  public onChangeActiveFilter(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'All';
    this.activeFilter = (Active[value] as Active);
  }

}
