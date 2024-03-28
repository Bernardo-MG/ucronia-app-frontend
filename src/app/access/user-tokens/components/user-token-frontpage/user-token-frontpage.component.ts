import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { UserTokenSelectionListComponent } from '../user-token-selection-list/user-token-selection-list.component';

@Component({
  selector: 'access-user-token-frontpage',
  standalone: true,
  imports: [LayoutModule, UserTokenSelectionListComponent],
  templateUrl: './user-token-frontpage.component.html'
})
export class UserTokenFrontpageComponent {

}
