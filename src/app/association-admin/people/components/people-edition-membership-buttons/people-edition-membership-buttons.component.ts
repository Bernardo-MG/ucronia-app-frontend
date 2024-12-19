import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { ModalHandler } from '@app/shared/layout/utils/ModalHandler';

@Component({
  selector: 'assoc-people-edition-membership-buttons',
  standalone: true,
  imports: [CommonModule, WaitingButtonComponent, ModalComponent],
  templateUrl: './people-edition-membership-buttons.component.html'
})
export class PeopleEditionMembershipButtonsComponent {

  @Input() public active: boolean | undefined = undefined;

  @Input() public renew: boolean | undefined = undefined;

  @Input() public disabled = false;

  @Input() public waiting = false;

  @Output() public activate = new EventEmitter<void>();

  @Output() public deactivate = new EventEmitter<void>();

  @Output() public enableRenew = new EventEmitter<void>();

  @Output() public disableRenew = new EventEmitter<void>();

  @Output() public convertToMember = new EventEmitter<void>();

  private modalHandler = new ModalHandler();

  public onShowActivate() {
    this.modalHandler.openModal('activate');
  }

  public onShowDeactivate() {
    this.modalHandler.openModal('deactivate');
  }

  public onShowEnableRenew() {
    this.modalHandler.openModal('enableRenew');
  }

  public onShowDisableRenew() {
    this.modalHandler.openModal('disableRenew');
  }

  public onShowConvertToMember() {
    this.modalHandler.openModal('convertToMember');
  }

}
