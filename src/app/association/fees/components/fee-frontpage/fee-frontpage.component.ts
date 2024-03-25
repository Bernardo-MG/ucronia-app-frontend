import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Active } from '@app/association/members/models/active';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeCalendarComponent } from '../fee-calendar/fee-calendar.component';

@Component({
  selector: 'app-fee-frontpage',
  standalone: true,
  imports: [RouterModule, LayoutModule, FeeCalendarComponent],
  templateUrl: './fee-frontpage.component.html'
})
export class FeeFrontpageComponent {

  public createPermission = false;

  public activeFilter = Active.Active;

  constructor(
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");
  }

  public onChangeActiveFilter(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'All';
    this.activeFilter = (Active[value] as Active);
  }

}
