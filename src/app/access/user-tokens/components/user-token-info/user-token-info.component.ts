import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserToken } from '@app/core/authentication/models/user-token';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-user-token-info',
  templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent extends FormComponent<UserToken> {

  @Input() public editable = false;

  @Input() public override set data(value: UserToken) {
    this.info = value;
    super.data = value;
  }

  public info = new UserToken();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      expirationDate: [null, Validators.required],
      revoked: [false, Validators.required]
    });
  }

}
