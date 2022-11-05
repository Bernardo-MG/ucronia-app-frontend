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

  public onSavePrivilege(data: Privilege[]): void {
    const ids = data.map(p => p.id);
    this.service.updatePrivileges(this.role.id, ids).subscribe();
  }

  public onAddPrivilege(): void {
    this.selectingPrivilege = true;
  }

  public onSelectPrivilege(privilege: Privilege) {
    this.privileges.push(privilege);
    this.selectingPrivilege = false;
  }

  public onGoToPrivilegesPage(page: number) {
    this.service.getPrivilegeSelection(page).subscribe(response => {
      this.privilegeSelection = response.content;
      this.privilegesPageInfo = response;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.role = d;
        });
      this.service.getPrivileges(identifier, { page: 0 })
        .subscribe(d => {
          this.privileges = d.content;
        });
    }
  }

}
