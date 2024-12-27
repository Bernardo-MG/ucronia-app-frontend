import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortProperty } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { LoginRegister } from '../../models/login-register';

@Component({
  selector: 'access-audit-login-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SortingButtonComponent, IconsModule],
  templateUrl: './access-audit-login-list.component.html'
})
export class AccessAuditLoginListComponent {

  @Input() public data: LoginRegister[] = [];

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
