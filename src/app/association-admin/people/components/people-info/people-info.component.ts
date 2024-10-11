import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import * as bootstrap from 'bootstrap';
import { PeopleInfoDetailsComponent } from '../people-info-details/people-info-details.component';

@Component({
  selector: 'app-people-info',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, CardModule, PeopleInfoDetailsComponent, WaitingButtonComponent, ModalComponent],
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
