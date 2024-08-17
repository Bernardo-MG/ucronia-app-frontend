import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { AccessUserService } from '../../../services/access-user.service';
import { AccessUserFormComponent } from '../../form/access-user-form/access-user-form.component';

@Component({
  selector: 'access-user-create',
  standalone: true,
  imports: [AccessUserFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
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
    return `/security/users/${saved.username}`;
  }

}
