import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { FormModule } from '@app/shared/form/form.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'assoc-member-info',
  standalone: true,
  imports: [CommonModule, FormModule, CardModule, PlaceholderDirective],
  templateUrl: './member-info.component.html'
})
export class MemberInfoComponent {

  @Input() public data = new Member();

  @Input() public waiting = false;

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'),new CardTab('status', 'Estado')];

  public onChangeView(newView: string) {
    this.view = newView;
  }

  public onShowActivate() {
    this.openModal('activate');
  }

  public onShowDeactivate() {
    this.openModal('deactivate');
  }

  private openModal(modalId: string): void {
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      let modal = bootstrap.Modal.getInstance(modalElement);
      if (!modal) {
        modal = new bootstrap.Modal(modalElement);
      }
      modal.show();
    }
  }

}
