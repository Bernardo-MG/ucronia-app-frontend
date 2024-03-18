import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { UserToken } from '@app/core/authentication/models/user-token';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { Observable, throwError } from 'rxjs';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'access-user-token-info-editor',
  templateUrl: './user-token-info-editor.component.html'
})
export class UserTokenInfoEditorComponent extends InfoEditorComponent<UserToken> implements OnInit {

  public extendExpirationForm;

  private token = "";

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private service: UserTokenService,
    private authContainer: AuthContainer
  ) {
    super(new UserToken());

    this.extendExpirationForm = fb.group({
      expirationDate: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user_token", "update");

    // Get id
    this.route.paramMap.subscribe(params => {
      const tokenParam = params.get('token');
      if(tokenParam) {
        this.token = tokenParam;
      }
      this.load();
    });
  }

  public onRevoke(): void {
    this.saving = true;
    this.service.revoke(this.data.token).subscribe({
      next: response => {
        this.interceptSave(response);
      },
      error: error => {
        this.interceptError(error);
      }
    });
  }

  public onExtendExpiration(): void {
    const expirationDate = this.extendExpirationForm.value.expirationDate;
    if (expirationDate) {
      this.saving = true;
      this.service.extend(this.data.token, expirationDate).subscribe({
        next: response => {
          this.interceptSave(response);
          this.extendExpirationForm.patchValue(this.data.expirationDate as any);
        },
        error: error => {
          this.interceptError(error);
        }
      });
    }
  }

  public override get editEnabled() {
    return super.editEnabled && (!this.data.revoked);
  }

  protected override delete(): void {
    throw new Error('Method not implemented.');
  }

  protected override read(): Observable<UserToken> {
    return this.service.getOne(this.token);
  }

  protected override save(toSave: UserToken): Observable<UserToken> {
    throw new Error('Method not implemented.');
  }

}