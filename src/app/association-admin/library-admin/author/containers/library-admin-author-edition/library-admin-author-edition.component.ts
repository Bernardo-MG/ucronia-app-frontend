import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Author } from '@app/models/library/author';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { LibraryAdminAuthorInfoComponent } from '../../components/library-admin-author-info/library-admin-author-info.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
  selector: 'assoc-library-admin-author-edition',
  standalone: true,
  imports: [CommonModule, CardModule, LibraryAdminAuthorFormComponent, LibraryAdminAuthorInfoComponent, ResponsiveShortColumnsDirective, PlaceholderDirective],
  templateUrl: './library-admin-author-edition.component.html'
})
export class LibraryAdminAuthorInfoEditorComponent extends InfoEditorStatusComponent<Author> implements OnInit {

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthorAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Author());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("library_author", "update");
    this.deletable = this.authContainer.hasPermission("library_author", "delete");

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

  protected override read(): Observable<Author> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Author): Observable<Author> {
    return this.service.update(this.data.number, toSave);
  }

}
