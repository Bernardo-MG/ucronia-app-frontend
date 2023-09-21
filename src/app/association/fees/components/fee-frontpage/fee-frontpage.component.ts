import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { YearRouteObserver } from '../../observer/year-route-observer';
import { FeeCalendarService } from '../../services/fee-calendar.service';


@Component({
  selector: 'assoc-fee-frontpage',
  templateUrl: './fee-frontpage.component.html'
})
export class FeeFrontpageComponent implements OnInit {

  public createPermission = false;

  public onlyActive = true;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("fee", "create");
  }

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
  }

}
