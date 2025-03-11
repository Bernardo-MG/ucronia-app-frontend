import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '@app/models/library/publisher';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminPublisherFormComponent } from '../../components/library-admin-publisher-form/library-admin-publisher-form.component';
import { LibraryAdminPublisherInfoComponent } from '../../components/library-admin-publisher-info/library-admin-publisher-info.component';
import { PublisherAdminService } from '../../services/publisher-admin.service';

@Component({
  selector: 'assoc-library-admin-publisher-edition',
  imports: [CommonModule, LibraryAdminPublisherFormComponent, LibraryAdminPublisherInfoComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-publisher-edition.container.html'
})
export class LibraryAdminPublisherInfoEditorContainer extends InfoEditorStatusComponent<Publisher> implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(PublisherAdminService);

  private authContainer = inject(AuthContainer);

  private number = -1;

  constructor() {
    super(new Publisher());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("library_publisher", "update");
    this.deletable = this.authContainer.hasPermission("library_publisher", "delete");

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
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Publisher> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Publisher): Observable<Publisher> {
    return this.service.update(this.data.number, toSave);
  }

}
