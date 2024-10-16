import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorAdminService } from '@app/association-admin/library-admin/services/donor-admin.service';
import { Person } from '@app/models/person/person';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { LibraryAdminDonorFormComponent } from '../library-admin-donor-form/library-admin-donor-form.component';

@Component({
  selector: 'app-library-admin-donor-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, CardModule, LibraryAdminDonorFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-donor-info-editor.component.html'
})
export class LibraryAdminDonorInfoEditorComponent extends InfoEditorStatusComponent<Person> implements OnInit {

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DonorAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Person());
  }

  public ngOnInit(): void {
    // Activate edition
    this.editing = true;

    // Check permissions
    this.editable = this.authContainer.hasPermission("inventory_donor", "update");
    this.deletable = this.authContainer.hasPermission("inventory_donor", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const numParam = params.get('number');
      if (numParam) {
        this.number = Number(numParam);
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Person> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Person): Observable<Person> {
    return this.service.update(this.data.number, toSave);
  }

}
