import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { LibraryBookFormComponent } from '../library-book-form/library-book-form.component';
import { LibraryBookInfoComponent } from '../library-book-info/library-book-info.component';

@Component({
  selector: 'assoc-library-book-info-editor',
  standalone: true,
  imports: [LayoutModule, LibraryBookFormComponent, LibraryBookInfoComponent],
  templateUrl: './library-book-info-editor.component.html'
})
export class LibraryBookInfoEditorComponent extends InfoEditorComponent<Book> implements OnInit {

  private index = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookService,
    private authContainer: AuthContainer
  ) {
    super(new Book());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("book_type", "update");
    this.deletable = this.authContainer.hasPermission("book_type", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.index).subscribe(r => {
      this.router.navigate(['/library']);
    });
  }

  protected override read(): Observable<Book> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: Book): Observable<Book> {
    return this.service.update(this.data.index, toSave);
  }

}
