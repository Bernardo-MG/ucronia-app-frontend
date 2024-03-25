import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { BookType } from '../../models/book-type';
import { Publisher } from '../../models/publisher';
import { PublisherService } from '../../services/publisher.service';
import { LibraryPublisherFormComponent } from '../library-publisher-form/library-publisher-form.component';
import { LibraryPublisherInfoComponent } from '../library-publisher-info/library-publisher-info.component';

@Component({
  selector: 'assoc-library-publisher-info-editor',
  standalone: true,
  imports: [LayoutModule, LibraryPublisherFormComponent, LibraryPublisherInfoComponent],
  templateUrl: './library-publisher-info-editor.component.html'
})
export class LibraryPublisherInfoEditorComponent extends InfoEditorComponent<Publisher> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PublisherService,
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
