import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/members/models/member';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { MemberInfoDetailsComponent } from '../member-info-details/member-info-details.component';

@Component({
  selector: 'assoc-member-info',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, MemberInfoDetailsComponent, WaitingButtonComponent],
  templateUrl: './member-info.component.html'
})
export class MemberInfoComponent {

  @Input() public data = new Member();

  @Input() public showMenu = false;

  @Input() public editEnabled = false;

  @Input() public waiting = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<number>();

  @Output() public startEditing = new EventEmitter<void>();

  public view: string = 'details';

  public onChangeView(newView: string) {
    this.view = newView;
  }

}
