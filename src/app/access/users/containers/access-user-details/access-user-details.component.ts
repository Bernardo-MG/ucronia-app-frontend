import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { PageInfo } from '@app/core/api/models/page-info';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { AccessUserService } from '../../services/access-user.service';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'access-user-details',
  templateUrl: './access-user-details.component.html'
})
export class AccessUserDetailsComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public valid = false;

  public editing = false;

  public editPermission = false;

  public deletePermission = false;

  public failures: { [key: string]: Failure[] } = {};

  public waitingRoles = false;

  public data: User = new User();

  public formValid = false;

  public roles: Role[] = [];

  public roleSelection: Role[] = [];

  public selectingRole = false;

  public roleSelectionPageInfo = new PageInfo();

  public rolesPageInfo = new PageInfo();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessUserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.editPermission = this.authService.hasPermission("user", "update");
    this.deletePermission = this.authService.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(data: User): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.failures = {};
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.id).subscribe(r => {
      this.router.navigate([`/security/users/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public onChange(changed: User) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: User) {
    this.data = value;
  }

  public onShowAddRole(): void {
    this.selectingRole = true;
  }

  public onAddRole(data: Role): void {
    this.service.addRole(this.data.id, data.id).subscribe(p => this.onGoToRolePage(0));
    this.selectingRole = false;
  }

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.data.id, data.id).subscribe(p => this.onGoToRolePage(0));
  }

  public onGoToRoleSelectionPage(page: number) {
    this.service.getRoleSelection(page).subscribe(response => {
      this.roleSelection = response.content;
      this.roleSelectionPageInfo = response;
    });
  }

  public onGoToRolePage(page: number) {
    this.waitingRoles = true;
    this.service.getRoles(this.data.id, page).subscribe(response => {
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
          this.data = d;
          this.onGoToRolePage(0);
        });
    }
  }

  public isEditable() {
    return this.editPermission && this.editing;
  }

}
