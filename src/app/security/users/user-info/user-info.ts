
import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '@bernardo-mg/authentication';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { Member } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'access-user-info',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CardModule, DetailField, StatusDetail],
  templateUrl: './user-info.html'
})
export class UserInfo {

  public readonly user = input(new User());
  public readonly member = input(new Member());

  public loading = input(false);

}
