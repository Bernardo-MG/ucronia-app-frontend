import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { Person } from '@app/models/person/person';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { CardNavigationComponent, CardTab, PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { PeopleEditionMembershipButtonsComponent } from '../people-edition-membership-buttons/people-edition-membership-buttons.component';
import { PeopleInfoDetailsComponent } from '../people-info-details/people-info-details.component';

@Component({
  selector: 'assoc-people-info',
  imports: [CommonModule, CardModule, PeopleInfoDetailsComponent, PeopleEditionMembershipButtonsComponent, PlaceholderDirective, IconSuccessOrFailureComponent, ControlButtonsComponent, CardNavigationComponent],
  templateUrl: './people-info.component.html'
})
export class PeopleInfoComponent {

  public readonly data = input(new Person());

  public readonly showMenu = input(false);

  public readonly editEnabled = input(false);

  public readonly waiting = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public activate = new EventEmitter<void>();

  @Output() public deactivate = new EventEmitter<void>();

  @Output() public enableRenew = new EventEmitter<void>();

  @Output() public disableRenew = new EventEmitter<void>();

  @Output() public convertToMember = new EventEmitter<void>();

  public get isMember() {
    return this.data().membership !== null;
  }

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'), new CardTab('membership', 'Socio')];

  public onChangeView(newView: string) {
    this.view = newView;
  }

}
