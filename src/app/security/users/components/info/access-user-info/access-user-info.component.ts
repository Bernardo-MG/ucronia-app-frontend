import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'access-user-info',
  standalone: true,
  imports: [CommonModule, IconsModule, FormModule],
  templateUrl: './access-user-info.component.html'
})
export class AccessUserInfoComponent {

  @Input() data = new User();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}
