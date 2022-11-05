import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { Role } from '@app/security/models/role';
import { User } from '@app/security/models/user';
import { SecurityUserService } from '../../service/security-user.service';

@Component({
  selector: 'security-user-edit-view',
  templateUrl: './security-user-edit-view.component.html',
  styleUrls: ['./security-user-edit-view.component.sass']
})
export class SecurityUserEditViewComponent implements OnInit {

  public user: User = new User();

  public roles: Role[] = [];

  public roleSelection: Role[] = [];

  public selectingRole = false;

  public roleSelectionPageInfo = new PageInfo();

  public rolesPageInfo = new PageInfo();

  constructor(
    private route: ActivatedRoute,
    private service: SecurityUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: User): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
  }

  public onDelete(): void {
    this.service.delete(this.user.id).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
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
    this.service.getRoles(this.user.id, page).subscribe(response => {
      this.roles = response.content;
      this.rolesPageInfo = response;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.user = d;
          this.onGoToRolePage(0);
        });
    }
  }

}
