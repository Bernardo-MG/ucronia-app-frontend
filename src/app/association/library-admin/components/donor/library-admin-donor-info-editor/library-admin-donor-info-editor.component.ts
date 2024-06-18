import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorAdminService } from '@app/association/library-admin/services/donor-admin.service';
import { Donor } from '@app/association/library/models/donor';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { LibraryAdminDonorFormComponent } from '../library-admin-donor-form/library-admin-donor-form.component';
import { LibraryAdminDonorInfoComponent } from '../library-admin-donor-info/library-admin-donor-info.component';

@Component({
  selector: 'app-library-admin-donor-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, LibraryAdminDonorFormComponent, LibraryAdminDonorInfoComponent, ArticleComponent],
  templateUrl: './library-admin-donor-info-editor.component.html'
})
export class LibraryAdminDonorInfoEditorComponent extends InfoEditorStatusComponent<Donor> implements OnInit {

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DonorAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Donor());
  }

  public ngOnInit(): void {
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
      this.router.navigate(['/library/admin']);
    });
  }

  protected override read(): Observable<Donor> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Donor): Observable<Donor> {
    return this.service.update(this.data.number, toSave);
  }

}
