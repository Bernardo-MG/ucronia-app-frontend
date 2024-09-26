import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '@app/models/library/publisher';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { PublisherAdminService } from '../../../services/publisher-admin.service';
import { LibraryAdminPublisherFormComponent } from '../library-admin-publisher-form/library-admin-publisher-form.component';

@Component({
  selector: 'assoc-library-admin-publisher-create',
  standalone: true,
  imports: [CardModule, LibraryAdminPublisherFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-publisher-create.component.html'
})
export class LibraryAdminPublisherCreateComponent extends CreateComponent<Publisher> {

  constructor(
    private service: PublisherAdminService,
    rtr: Router,
    rt: ActivatedRoute
  ) {
    super(rtr, rt);
  }

  protected override save(toSave: Publisher): Observable<Publisher> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Publisher): string {
    return '../..';
  }

}
