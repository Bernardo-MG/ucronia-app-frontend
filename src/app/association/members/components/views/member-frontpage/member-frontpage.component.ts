import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { MemberBalanceChartWidgetComponent } from '../../core/member-balance-chart-widget/member-balance-chart-widget.component';
import { MemberListWidgetComponent } from '../../core/member-list-widget/member-list-widget.component';

@Component({
  selector: 'assoc-member-frontpage',
  standalone: true,
  imports: [MemberBalanceChartWidgetComponent, MemberListWidgetComponent, ArticleComponent, JustifyCenterDirective],
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent {

}
