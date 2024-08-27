import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'access-user-info-details',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './access-user-info-details.component.html'
})
export class AccessUserInfoDetailsComponent {

  @Input() data = new User();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}
