import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '@app/models/person/person';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, CardNavigationComponent, CardTab, PlaceholderDirective } from '@bernardo-mg/layout';
import { Modal } from 'bootstrap';
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

  public onChangeView(newView: string) {
    this.view = newView;
  }

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
