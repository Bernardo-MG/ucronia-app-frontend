import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';

@Component({
  selector: 'account-profile-info',
  imports: [DetailField],
  templateUrl: './account-profile-info.html'
})
export class AccountProfileInfo {

  public readonly data = input<Profile>();

  public readonly loading = input(false);

  public get memberName(): string {
    const name = this.data()?.name;

    if (!name) {
      return '';
    }

    return name.fullName
      || [name.firstName, name.lastName]
        .filter(Boolean)
        .join(' ');
  }
}