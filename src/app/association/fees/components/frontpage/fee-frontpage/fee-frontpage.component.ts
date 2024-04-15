import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Active } from '@app/association/members/models/active';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FeeCalendarWidgetComponent } from '../../calendar/fee-calendar-widget/fee-calendar-widget.component';
import { FeePaymentChartWidgetComponent } from '../../report/fee-payment-chart-widget/fee-payment-chart-widget.component';

@Component({
  selector: 'assoc-fee-frontpage',
  standalone: true,
  imports: [RouterModule, FeeCalendarWidgetComponent, ArticleComponent, FeePaymentChartWidgetComponent],
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
