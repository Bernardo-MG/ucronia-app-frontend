
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { AccessUserFormComponent } from '../../components/access-user-form/access-user-form.component';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-creation',
  imports: [CardModule, AccessUserFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './access-user-creation.container.html'
})
export class AccessUserCreationContainer extends CreateComponent<User> {

  private readonly service = inject(AccessUserService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected override save(toSave: User): Observable<User> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: User) {
    super.handleSaveSuccess(saved);
    this.router.navigate([`/security/users/${saved.username}`], { relativeTo: this.route });
  }

}
