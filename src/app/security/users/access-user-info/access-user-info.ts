
import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '@bernardo-mg/authentication';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'access-user-info',
  imports: [FormsModule, ReactiveFormsModule,ButtonModule,CardModule,SkeletonModule],
  templateUrl: './access-user-info.html'
})
export class AccessUserInfo  {

  public data = input(new User());

  public loading = input(false);

}
