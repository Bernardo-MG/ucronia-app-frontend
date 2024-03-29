import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { BookType } from '../../models/book-type';
import { AuthorService } from '../../services/author.service';
import { LibraryAuthorFormComponent } from '../library-author-form/library-author-form.component';
import { LibraryAuthorInfoComponent } from '../library-author-info/library-author-info.component';

@Component({
  selector: 'assoc-library-author-info-editor',
  standalone: true,
  imports: [LibraryAuthorFormComponent, LibraryAuthorInfoComponent, ArticleComponent, EditionWrapperComponent],
  templateUrl: './library-author-info-editor.component.html'
})
export class LibraryAuthorInfoEditorComponent extends InfoEditorComponent<Author> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthorService,
    private authContainer: AuthContainer
  ) {
    super(new Author());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = false;
    this.deletable = this.authContainer.hasPermission("library_author", "delete");

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
