import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Privilege } from '@app/core/authentication/models/privilege';
import { Role } from '@app/core/authentication/models/role';
import { PageInfo } from '@app/core/api/models/page-info';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-edit-view',
  templateUrl: './access-role-edit-view.component.html'
})
export class AccessRoleEditViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public waitingPrivileges = false;

  public role = new Role();

  public formValid = false;

  public privileges: Privilege[] = [];

  public privilegeSelection: Privilege[] = [];

  public selectingPrivilege = false;

  public privilegeSelectionPageInfo = new PageInfo();

  public privilegesPageInfo = new PageInfo();

  constructor(
    private route: ActivatedRoute,
    private service: AccessRoleService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(): void {
    this.waiting = true;
    this.service.create(this.role).subscribe({
      next: d => {
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Role) {
    this.role = value;
  }

  public onShowAddPrivilege(): void {
    this.selectingPrivilege = true;
  }

  public onAddPrivilege(data: Privilege): void {
    this.service.addPrivilege(this.role.id, data.id).subscribe(p => this.onGoToPrivilegePage(0));
    this.selectingPrivilege = false;
  }

  public onRemovePrivilege(data: Privilege): void {
    this.service.removePrivilege(this.role.id, data.id).subscribe(p => this.onGoToPrivilegePage(0));
  }

  public onGoToPrivilegeSelectionPage(page: number) {
    this.service.getPrivilegeSelection(page).subscribe(response => {
      this.privilegeSelection = response.content;
      this.privilegeSelectionPageInfo = response;
    });
  }

  public onGoToPrivilegePage(page: number) {
    this.waitingPrivileges = true;
    this.service.getPrivileges(this.role.id, page).subscribe(response => {
      this.privileges = response.content;
      this.privilegesPageInfo = response;
      this.waitingPrivileges = false;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.role = d;
          this.onGoToPrivilegePage(0);
        });
    }
  }

}
