import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortProperty } from '@bernardo-mg/request';
import { LoginRegister } from '../../models/login-register';

@Component({
    selector: 'access-audit-login-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
    templateUrl: './access-audit-login-list.component.html'
})
export class AccessAuditLoginListComponent {

  @Input() public data: LoginRegister[] = [];

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
