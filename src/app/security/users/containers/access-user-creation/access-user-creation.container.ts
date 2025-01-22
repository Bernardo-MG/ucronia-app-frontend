import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { AccessUserFormComponent } from '../../components/access-user-form/access-user-form.component';
import { AccessUserService } from '../../services/access-user.service';

@Component({
    selector: 'access-user-creation',
    imports: [AccessUserFormComponent, ArticleComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent],
    templateUrl: './access-user-creation.container.html'
})
export class AccessUserCreationContainer extends CreateComponent<User> {

  constructor(
    private service: AccessUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: User): Observable<User> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: User) {
    super.handleSaveSuccess(saved);
    this.router.navigate([`/security/users/${saved.username}`], { relativeTo: this.route });
  }

}
