
import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '@bernardo-mg/authentication';
import { Member } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'access-user-info',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CardModule, SkeletonModule],
  templateUrl: './user-info.html'
})
export class UserInfo {

  public readonly user = input(new User());
  public readonly member = input(new Member());

  public loading = input(false);

}
