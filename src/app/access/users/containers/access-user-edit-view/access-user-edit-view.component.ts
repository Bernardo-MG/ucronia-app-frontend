import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { PageInfo } from '@app/core/api/models/page-info';
import { AccessUserService } from '../../services/access-user.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'access-user-edit-view',
  templateUrl: './access-user-edit-view.component.html'
})
export class AccessUserEditViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures: Failure[] = [];

  public waitingRoles = false;

  public user: User = new User();

  public formValid = false;

  public roles: Role[] = [];

  public roleSelection: Role[] = [];

  public selectingRole = false;

  public roleSelectionPageInfo = new PageInfo();

  public rolesPageInfo = new PageInfo();

  constructor(
    private route: ActivatedRoute,
    private service: AccessUserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: User): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.failures = [];
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = error.failures;
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: User) {
    this.user = value;
  }

  public onShowAddRole(): void {
    this.selectingRole = true;
  }

  public onAddRole(data: Role): void {
    this.service.addRole(this.user.id, data.id).subscribe(p => this.onGoToRolePage(0));
    this.selectingRole = false;
  }

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.user.id, data.id).subscribe(p => this.onGoToRolePage(0));
  }

  public onGoToRoleSelectionPage(page: number) {
    this.service.getRoleSelection(page).subscribe(response => {
      this.roleSelection = response.content;
      this.roleSelectionPageInfo = response;
    });
  }

  public onGoToRolePage(page: number) {
    this.waitingRoles = true;
    this.service.getRoles(this.user.id, page).subscribe(response => {
      this.roles = response.content;
      this.rolesPageInfo = response;
      this.waitingRoles = false;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.user = d;
          this.onGoToRolePage(0);
        });
    }
  }

}
