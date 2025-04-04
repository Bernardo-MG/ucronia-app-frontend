import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
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
