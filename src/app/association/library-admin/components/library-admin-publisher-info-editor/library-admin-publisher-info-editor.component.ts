import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { BookType } from '../../models/book-type';
import { Publisher } from '../../models/publisher';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherFormComponent } from '../library-admin-publisher-form/library-admin-publisher-form.component';
import { LibraryAdminPublisherInfoComponent } from '../library-admin-publisher-info/library-admin-publisher-info.component';

@Component({
  selector: 'assoc-library-admin-publisher-info-editor',
  standalone: true,
  imports: [LibraryAdminPublisherFormComponent, LibraryAdminPublisherInfoComponent, ArticleComponent, InfoEditorComponent],
  templateUrl: './library-admin-publisher-info-editor.component.html'
})
export class LibraryAdminPublisherInfoEditorComponent extends InfoEditorStatusComponent<Publisher> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PublisherAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Publisher());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = false;
    this.deletable = this.authContainer.hasPermission("library_publisher", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const nameParam = params.get('name');
      if (nameParam) {
        this.name = nameParam;
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate(['/library']);
    });
  }

  protected override read(): Observable<BookType> {
    return this.service.getOne(this.name);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.update(this.data.name, toSave);
  }

}
