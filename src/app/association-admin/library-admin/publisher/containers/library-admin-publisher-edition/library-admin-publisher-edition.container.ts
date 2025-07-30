
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '@app/models/library/publisher';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { LibraryAdminPublisherFormComponent } from '../../components/library-admin-publisher-form/library-admin-publisher-form.component';
import { LibraryAdminPublisherInfoComponent } from '../../components/library-admin-publisher-info/library-admin-publisher-info.component';
import { PublisherAdminService } from '../../services/publisher-admin.service';

@Component({
  selector: 'assoc-library-admin-publisher-edition',
  imports: [CardModule, LibraryAdminPublisherFormComponent, LibraryAdminPublisherInfoComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-publisher-edition.container.html'
})
export class LibraryAdminPublisherInfoEditorContainer extends InfoEditorStatusComponent<Publisher> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(PublisherAdminService);

  private number = -1;

  constructor() {
    const authContainer = inject(AuthContainer);

    super(new Publisher());
    // Check permissions
    this.editable = authContainer.hasPermission("library_publisher", "update");
    this.deletable = authContainer.hasPermission("library_publisher", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const numberParam = params.get('number');
      if (numberParam) {
        this.number = Number(numberParam);
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Publisher> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Publisher): Observable<Publisher> {
    return this.service.update(this.data.number, toSave);
  }

}
