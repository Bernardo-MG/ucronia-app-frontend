import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { Observable } from 'rxjs';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-create',
  templateUrl: './access-user-create.component.html'
})
export class AccessUserCreateComponent extends CreateComponent<User> {

  constructor(
    private service: AccessUserService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: User): Observable<User> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: User): string {
    return `/users/${saved.username}`;
  }

}
