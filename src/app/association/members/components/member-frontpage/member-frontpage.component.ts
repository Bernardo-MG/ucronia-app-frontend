import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Active } from '../../models/active';
import { MemberBalanceChartComponent } from '../member-balance-chart/member-balance-chart.component';
import { MemberListComponent } from '../member-list/member-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-frontpage',
  standalone: true,
  imports: [RouterModule, LayoutModule, MemberBalanceChartComponent, MemberListComponent],
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent implements OnInit {

  public createPermission = false;

  public activeFilter = Active.Active;

  constructor(
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("member", "create");
  }

  public onChangeActiveFilter(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'All';
    this.activeFilter = (Active[value] as Active);
  }

}
