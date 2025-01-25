import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
    selector: 'access-user-info-details',
    imports: [CommonModule, PlaceholderDirective],
    templateUrl: './access-user-info-details.component.html'
})
export class AccessUserInfoDetailsComponent {

  @Input() data = new User();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Input() public waiting = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}
