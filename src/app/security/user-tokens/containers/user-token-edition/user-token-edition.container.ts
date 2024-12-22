import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserToken } from '@app/core/authentication/models/user-token';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { UserTokenService } from '../../services/user-token.service';
import { UserTokenInfoComponent } from '../../components/data/user-token-info/user-token-info.component';
import { UserTokenStatusComponent } from '../../components/data/user-token-status/user-token-status.component';

@Component({
  selector: 'access-user-token-edition',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule, UserTokenInfoComponent, ArticleComponent, WaitingButtonComponent, ModalComponent, UserTokenStatusComponent, ResponsiveShortColumnsDirective],
  templateUrl: './user-token-edition.container.html'
})
export class UserTokenEditionContainer extends InfoEditorStatusComponent<UserToken> implements OnInit {

  public extendExpirationForm;

  private token = "";

  public view: string = 'details';

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

  public onChangeView(newView: string) {
    this.view = newView;
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