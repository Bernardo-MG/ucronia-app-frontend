import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorAdminService } from '@app/association-admin/library-admin/services/donor-admin.service';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { LibraryAdminDonorFormComponent } from '../library-admin-donor-form/library-admin-donor-form.component';

@Component({
  selector: 'app-library-admin-donor-create',
  standalone: true,
  imports: [CardModule, LibraryAdminDonorFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-donor-create.component.html'
})
export class LibraryAdminDonorCreateComponent extends CreateComponent<Person> {

  constructor(
    private service: DonorAdminService,
    rtr: Router,
    rt: ActivatedRoute
  ) {
    super(rtr, rt);
  }

  protected override save(toSave: Person): Observable<Person> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Person): string {
    return '../..';
  }
}
