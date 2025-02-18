import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent, WaitingButtonComponent } from '@bernardo-mg/layout';
import { Modal } from 'bootstrap';

@Component({
  selector: 'assoc-people-edition-membership-buttons',
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

  public onShowActivate() {
    const modal = document.getElementById('activateModal');
    if (modal) {
      new Modal(modal).show();
    }
  }

  public onShowDeactivate() {
    const modal = document.getElementById('deactivateModal');
    if (modal) {
      new Modal(modal).show();
    }
  }

  public onShowEnableRenew() {
    const modal = document.getElementById('enableRenewModal');
    if (modal) {
      new Modal(modal).show();
    }
  }

  public onShowDisableRenew() {
    const modal = document.getElementById('disableRenewModal');
    if (modal) {
      new Modal(modal).show();
    }
  }

  public onShowConvertToMember() {
    const modal = document.getElementById('convertToMemberModal');
    if (modal) {
      new Modal(modal).show();
    }
  }

}
