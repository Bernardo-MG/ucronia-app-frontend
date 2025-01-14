import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { ModalHandler } from '@app/shared/layout/utils/ModalHandler';
import { PeopleEditionMembershipButtonsComponent } from '../people-edition-membership-buttons/people-edition-membership-buttons.component';
import { PeopleInfoDetailsComponent } from '../people-info-details/people-info-details.component';

@Component({
  selector: 'assoc-people-info',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, CardModule, PeopleInfoDetailsComponent, WaitingButtonComponent, PeopleEditionMembershipButtonsComponent, ModalComponent],
  templateUrl: './people-info.component.html'
})
export class PeopleInfoComponent {

  @Input() public data = new Person();

  @Input() public showMenu = false;

  @Input() public editEnabled = false;

  @Input() public waiting = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public activate = new EventEmitter<void>();

  @Output() public deactivate = new EventEmitter<void>();

  @Output() public enableRenew = new EventEmitter<void>();

  @Output() public disableRenew = new EventEmitter<void>();

  @Output() public convertToMember = new EventEmitter<void>();

  public get isMember() {
    return this.data.membership !== null;
  }

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'), new CardTab('membership', 'Socio')];

  private modalHandler = new ModalHandler();

  public onChangeView(newView: string) {
    this.view = newView;
  }

  public onShowActivate() {
    this.modalHandler.openModal('activateModal');
  }

  public onShowDeactivate() {
    this.modalHandler.openModal('deactivateModal');
  }

  public onShowEnableRenew() {
    this.modalHandler.openModal('enableRenewModal');
  }

  public onShowDisableRenew() {
    this.modalHandler.openModal('disableRenewModal');
  }

  public onShowConvertToMember() {
    this.modalHandler.openModal('convertToMemberModal');
  }

}
