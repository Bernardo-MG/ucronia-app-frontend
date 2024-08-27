import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/members/shared/models/member';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import * as bootstrap from 'bootstrap';
import { MemberInfoDetailsComponent } from '../member-info-details/member-info-details.component';

@Component({
  selector: 'assoc-member-info',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, MemberInfoDetailsComponent, WaitingButtonComponent, ModalComponent],
  templateUrl: './member-info.component.html'
})
export class MemberInfoComponent {

  @Input() public data = new Member();

  @Input() public showMenu = false;

  @Input() public editEnabled = false;

  @Input() public waiting = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public activate = new EventEmitter<void>();

  @Output() public deactivate = new EventEmitter<void>();

  public view: string = 'details';

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
