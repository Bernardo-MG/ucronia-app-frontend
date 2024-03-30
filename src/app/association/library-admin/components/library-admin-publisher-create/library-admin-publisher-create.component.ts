import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Publisher } from '../../models/publisher';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherFormComponent } from '../library-admin-publisher-form/library-admin-publisher-form.component';

@Component({
  selector: 'assoc-library-admin-publisher-create',
  standalone: true,
  imports: [ LibraryAdminPublisherFormComponent, ArticleComponent ],
  templateUrl: './library-admin-publisher-create.component.html'
})
export class LibraryAdminPublisherCreateComponent extends CreateComponent<Publisher> {

  constructor(
    private service: PublisherAdminService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Publisher): Observable<Publisher> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Publisher): string {
    return '/library/admin';
  }

}
