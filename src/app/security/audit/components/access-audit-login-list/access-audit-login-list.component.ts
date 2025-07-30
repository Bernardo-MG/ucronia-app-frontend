
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortingProperty } from '@bernardo-mg/request';
import { LoginRegister } from '../../models/login-register';

@Component({
  selector: 'access-audit-login-list',
  imports: [RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
  templateUrl: './access-audit-login-list.component.html'
})
export class AccessAuditLoginListComponent {

  public readonly data = input<LoginRegister[]>([]);

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

}
