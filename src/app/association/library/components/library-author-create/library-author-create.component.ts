import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { LibraryAuthorFormComponent } from '../library-author-form/library-author-form.component';

@Component({
  selector: 'assoc-library-author-create',
  standalone: true,
  imports: [LibraryAuthorFormComponent, ArticleComponent],
  templateUrl: './library-author-create.component.html'
})
export class LibraryAuthorCreateComponent extends CreateComponent<Author> {

  constructor(
    private service: AuthorService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Author): Observable<Author> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Author): string {
    return `/library/author/${saved.name}`;
  }

}
