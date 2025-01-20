import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { FormModule } from '@app/shared/form/form.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import { ModalHandler } from '@app/shared/layout/utils/ModalHandler';

@Component({
    selector: 'assoc-member-details',
    imports: [CommonModule, FormModule, CardModule, PlaceholderDirective],
    templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent {

  @Input() public data = new Member();

  @Input() public waiting = false;

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'),new CardTab('status', 'Estado')];

  private modalHandler = new ModalHandler();

  public onChangeView(newView: string) {
    this.view = newView;
  }

  public onShowActivate() {
    this.modalHandler.openModal('activate');
  }

  public onShowDeactivate() {
    this.modalHandler.openModal('deactivate');
  }

}
