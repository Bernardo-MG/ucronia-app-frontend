import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { Observable } from 'rxjs';
import { AccessRoleFormComponent } from '../../components/access-role-form/access-role-form.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-creation',
  imports: [AccessRoleFormComponent, ArticleComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent],
  templateUrl: './access-role-creation.container.html'
})
export class AccessRoleCreationContainer extends CreateComponent<Role> {

  private readonly service = inject(AccessRoleService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected override save(toSave: Role): Observable<Role> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Role) {
    super.handleSaveSuccess(saved);
    this.router.navigate([`/security/roles/${saved.name}`], { relativeTo: this.route });
  }

}
