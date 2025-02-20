import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserToken } from '@app/core/authentication/models/user-token';
import { PlaceholderDirective } from '@bernardo-mg/layout';
import { Failure, FieldFailures } from '@bernardo-mg/request';

@Component({
    selector: 'access-user-token-info',
    imports: [CommonModule, PlaceholderDirective],
    templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent {

  @Input() public data = new UserToken();

  @Input() public failures = new FieldFailures();

  @Input() public waiting = false;

  public isFieldInvalid(property: string): boolean {
    return this.failures.hasFailures(property);
  }

  public getFailures(property: string): Failure[] {
    return this.failures.getFailures(property);
  }

}
