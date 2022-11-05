import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { Privilege } from '@app/security/models/privilege';
import { Role } from '@app/security/models/role';
import { SecurityRoleService } from '../../service/security-role.service';

@Component({
  selector: 'security-role-edit-view',
  templateUrl: './security-role-edit-view.component.html',
  styleUrls: ['./security-role-edit-view.component.sass']
})
export class SecurityRoleEditViewComponent implements OnInit {

  public role: Role = new Role();

  public privileges: Privilege[] = [];

  public privilegeSelection: Privilege[] = [];

  public selectingPrivilege = false;

  public privilegeSelectionPageInfo = new PageInfo();

  public privilegesPageInfo = new PageInfo();

  constructor(
    private route: ActivatedRoute,
    private service: SecurityRoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Role): void {
    this.service.update(this.role.id, data).subscribe(d => {
      this.router.navigate(['/security/roles']);
    });
  }

  public onDelete(): void {
    this.service.delete(this.role.id).subscribe(d => {
      this.router.navigate(['/security/roles']);
    });
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
    this.service.getPrivileges(this.role.id, page).subscribe(response => {
      this.privileges = response.content;
      this.privilegesPageInfo = response;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.role = d;
          this.onGoToPrivilegePage(0);
        });
    }
  }

}
