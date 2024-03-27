import { Component, OnInit } from '@angular/core';
import { Active } from '@app/association/members/models/active';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { FeeCalendarComponent } from '../fee-calendar/fee-calendar.component';

@Component({
  selector: 'assoc-fee-calendar-widget',
  standalone: true,
  imports: [FeeCalendarComponent],
  templateUrl: './fee-calendar-widget.component.html'
})
export class FeeCalendarWidgetComponent implements OnInit {

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
