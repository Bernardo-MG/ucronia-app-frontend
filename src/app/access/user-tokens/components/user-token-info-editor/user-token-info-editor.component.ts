import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { UserToken } from '@app/core/authentication/models/user-token';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';
import { throwError } from 'rxjs';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'access-user-token-info-editor',
  templateUrl: './user-token-info-editor.component.html'
})
export class UserTokenInfoEditorComponent extends InfoEditorComponent implements OnInit {

  public token = "";

  public data = new UserToken();

  public extendExpirationForm;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private service: UserTokenService,
    private authContainer: AuthContainer
  ) {
    super();

    this.extendExpirationForm = fb.group({
      expirationDate: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user_token", "update");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('token'));
    });
  }

  public onRevoke(): void {
    this.saving = true;
    this.service.revoke(this.data.token).subscribe({
      next: d => {
        this.data = d;

        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
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

  public onExtendExpiration(): void {
    this.saving = true;
    const expirationDate = this.extendExpirationForm.value.expirationDate;
    if (expirationDate) {
      this.service.extend(this.data.token, expirationDate).subscribe({
        next: d => {
          this.data = d;
          this.extendExpirationForm.patchValue(this.data.expirationDate as any);

          this.failures = new FieldFailures();
          // Reactivate view
          this.saving = false;
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
  }

  public override isAbleToEdit() {
    return super.isAbleToEdit() && (!this.data.revoked);
  }

  private load(id: string | null): void {
    if (id) {
      this.token = id;
      this.reading = true;
      this.service.getOne(id)
        .subscribe({
          next: response => {
            this.data = response;
            this.extendExpirationForm.patchValue(this.data as any);
            this.reading = false;
          },
          error: error => {
            this.error = true;
            this.reading = false;
          }
        });
    }
  }

}
