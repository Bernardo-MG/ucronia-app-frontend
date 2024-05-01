import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Donor } from '@app/association/library-admin/models/donor';
import { DonorAdminService } from '@app/association/library-admin/services/donor-admin.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { LibraryAdminDonorFormComponent } from '../library-admin-donor-form/library-admin-donor-form.component';

@Component({
  selector: 'app-library-admin-donor-create',
  standalone: true,
  imports: [LibraryAdminDonorFormComponent, ArticleComponent],
  templateUrl: './library-admin-donor-create.component.html'
})
export class LibraryAdminDonorCreateComponent extends CreateComponent<Donor> {

  constructor(
    private service: DonorAdminService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Donor): Observable<Donor> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Donor): string {
    return '/library/admin';
  }
}
