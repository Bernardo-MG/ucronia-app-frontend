import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { ModalHandler } from '@app/shared/layout/utils/modal-handler';
import { CardBodyComponent, CardComponent, CardHeaderComponent, CardTab, PlaceholderDirective } from '@bernardo-mg/layout';

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
