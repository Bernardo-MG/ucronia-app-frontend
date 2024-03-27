import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserSelectionListWidgetComponent } from '../access-user-selection-list-widget/access-user-selection-list-widget.component';

@Component({
  selector: 'access-user-frontpage',
  standalone: true,
  imports: [LayoutModule, AccessUserSelectionListWidgetComponent],
  templateUrl: './access-user-frontpage.component.html'
})
export class AccessFrontpageComponent {

}
