
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { AccessUserForm } from '../access-user-form/access-user-form';
import { AccessUserService } from '../access-user-service';

@Component({
  selector: 'access-user-creation',
  imports: [CardModule, AccessUserForm, ResponsiveShortColumnsDirective],
  templateUrl: './access-user-creation.html'
})
export class AccessUserCreation extends CreateComponent<User> {

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
