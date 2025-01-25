import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { AccessRoleFormComponent } from '../../components/access-role-form/access-role-form.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
    selector: 'access-role-creation',
    imports: [AccessRoleFormComponent, ArticleComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent],
    templateUrl: './access-role-creation.container.html'
})
export class AccessRoleCreationContainer extends CreateComponent<Role> {

  constructor(
    private service: AccessRoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: Role): Observable<Role> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Role) {
    super.handleSaveSuccess(saved);
    this.router.navigate([`/security/roles/${saved.name}`], { relativeTo: this.route });
  }

}
