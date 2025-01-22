import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '@app/models/person/person';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardNavigationComponent } from '@app/shared/card/components/card-navigation/card-navigation.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { IconSuccessOrFailureComponent } from '@app/shared/icons/components/icon-success-or-failure/icon-success-or-failure.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import { ModalHandler } from '@app/shared/layout/utils/ModalHandler';
import { PeopleEditionMembershipButtonsComponent } from '../people-edition-membership-buttons/people-edition-membership-buttons.component';
import { PeopleInfoDetailsComponent } from '../people-info-details/people-info-details.component';

@Component({
    selector: 'assoc-people-info',
    imports: [CommonModule, PeopleInfoDetailsComponent, PeopleEditionMembershipButtonsComponent, PlaceholderDirective, IconSuccessOrFailureComponent, ControlButtonsComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent, CardNavigationComponent],
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
