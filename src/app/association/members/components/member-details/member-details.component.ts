
import { Component, input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { CardTab, PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-member-details',
  imports: [CardModule, PlaceholderDirective],
  templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent {

  public readonly data = input(new Member());

  public readonly waiting = input(false);

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'), new CardTab('status', 'Estado')];

  public onChangeView(newView: string) {
    this.view = newView;
  }

}
