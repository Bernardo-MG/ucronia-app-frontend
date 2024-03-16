import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { BookType } from '../../models/book-type';
import { BookTypeService } from '../../services/book-type.service';
import { LibraryGameSystemFormComponent } from '../library-game-system-form/library-game-system-form.component';
import { LibraryGameSystemInfoComponent } from '../library-game-system-info/library-game-system-info.component';

@Component({
  selector: 'assoc-library-game-system-info-editor',
  standalone: true,
  imports: [LayoutModule, LibraryGameSystemFormComponent, LibraryGameSystemInfoComponent],
  templateUrl: './library-game-system-info-editor.component.html'
})
export class LibraryGameSystemInfoEditorComponent extends InfoEditorComponent<BookType> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookTypeService,
    private authContainer: AuthContainer
  ) {
    super(new BookType());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("book_type", "update");
    this.deletable = this.authContainer.hasPermission("book_type", "delete");

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
