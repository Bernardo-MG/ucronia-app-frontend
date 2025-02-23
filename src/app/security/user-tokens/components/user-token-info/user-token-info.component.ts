import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserToken } from '../../../../../../projects/bernardo-mg/authentication/src/lib/models/user-token';
import { PlaceholderDirective } from '@bernardo-mg/layout';
import { FieldFailure, FailureStore } from '@bernardo-mg/request';

@Component({
    selector: 'access-user-token-info',
    imports: [CommonModule, PlaceholderDirective],
    templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent {

  @Input() public data = new UserToken();

  @Input() public failures = new FailureStore();

  @Input() public waiting = false;

  public isFieldInvalid(property: string): boolean {
    return this.failures.hasFailures(property);
  }

  public getFailures(property: string): FieldFailure[] {
    return this.failures.getFailures(property);
  }

}
