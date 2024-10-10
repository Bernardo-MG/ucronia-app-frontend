import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Publisher } from '@app/models/library/publisher';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { PublisherAdminService } from '../../../services/publisher-admin.service';
import { LibraryAdminPublisherFormComponent } from '../library-admin-publisher-form/library-admin-publisher-form.component';

@Component({
  selector: 'assoc-library-admin-publisher-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, CardModule, LibraryAdminPublisherFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-publisher-info-editor.component.html'
})
export class LibraryAdminPublisherInfoEditorComponent extends InfoEditorStatusComponent<Publisher> implements OnInit {

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PublisherAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Publisher());
  }

  public ngOnInit(): void {
    // Activate edition
    this.editing = true;

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
