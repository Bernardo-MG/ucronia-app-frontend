import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { ModalHandler } from '@app/shared/layout/utils/ModalHandler';
import { PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-member-details',
    imports: [CommonModule, PlaceholderDirective, CardComponent, CardBodyComponent, CardHeaderComponent],
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
