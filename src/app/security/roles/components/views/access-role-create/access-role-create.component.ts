import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { AccessRoleService } from '../../../services/access-role.service';
import { AccessRoleFormComponent } from '../../data/access-role-form/access-role-form.component';

@Component({
  selector: 'access-role-create',
  standalone: true,
  imports: [AccessRoleFormComponent, ArticleComponent],
  templateUrl: './access-role-create.component.html'
})
export class AccessRoleCreateComponent extends CreateComponent<Role> {

  constructor(
    private service: AccessRoleService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Role): Observable<Role> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Role): string {
    return `/roles/${saved.name}`;
  }

}
