import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '@app/models/library/publisher';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { LibraryAdminPublisherFormComponent } from '../../components/library-admin-publisher-form/library-admin-publisher-form.component';
import { PublisherAdminService } from '../../services/publisher-admin.service';

@Component({
    selector: 'assoc-library-admin-publisher-creation',
    imports: [LibraryAdminPublisherFormComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
    templateUrl: './library-admin-publisher-creation.container.html'
})
export class LibraryAdminPublisherCreateContainer extends CreateComponent<Publisher> {

  constructor(
    private service: PublisherAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: Publisher): Observable<Publisher> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Publisher) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
