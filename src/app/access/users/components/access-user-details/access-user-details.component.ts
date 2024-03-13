import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';
import { throwError } from 'rxjs';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-details',
  templateUrl: './access-user-details.component.html'
})
export class AccessUserDetailsComponent extends InfoEditorComponent implements OnInit {

  public data = new User();

  public view = 'list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessUserService,
    private authContainer: AuthContainer
  ) {
    super();
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user", "update");
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('user'));
    });
  }

  public onSave(toSave: User): void {
    this.saving = true;
    this.service.update(toSave.username, toSave).subscribe({
      next: d => {
        this.data = d;

        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.username).subscribe(r => {
      this.router.navigate([`/users`]);
    });
  }

  public onAddRole(data: Role): void {
    this.view = "list";
  }

  public onShowAddRole() {
    this.view = "add";
  }

  public onCancelAddRole() {
    this.view = "list";
  }

  private load(id: string | null): void {
    if (id) {
      this.reading = true;
      this.service.getOne(id)
        .subscribe({
          next: d => {
            this.data = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

}
