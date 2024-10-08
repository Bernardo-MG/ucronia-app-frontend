import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { UserToken } from '@app/core/authentication/models/user-token';
import { FormModule } from '@app/shared/form/form.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'access-user-token-info',
  standalone: true,
  imports: [CommonModule, FormModule, PlaceholderDirective],
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
