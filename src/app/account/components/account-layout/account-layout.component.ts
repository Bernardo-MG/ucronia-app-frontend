import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderNavigationWrapperComponent } from '@app/core/layout/components/header-navigation-wrapper/header-navigation-wrapper.component';

@Component({
  selector: 'account-layout',
  standalone: true,
  imports: [RouterModule, HeaderNavigationWrapperComponent],
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

}
