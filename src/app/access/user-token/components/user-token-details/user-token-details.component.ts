import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserToken } from '@app/core/authentication/models/user-token';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'access-user-token-details',
  templateUrl: './user-token-details.component.html'
})
export class UserTokenDetailsComponent implements OnInit {

  /**
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public tokenId = 0;

  public error = false;

  public data = new UserToken();

  constructor(
    private route: ActivatedRoute,
    private service: UserTokenService,
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user", "update");
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.tokenId = identifier;
      this.reading = true;
      this.service.getOne(identifier)
        .subscribe({
          next: response => {
            this.data = response;
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
