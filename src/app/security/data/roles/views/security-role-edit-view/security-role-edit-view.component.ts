import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  onSave(data: Role): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/security/roles']);
    });
  }

  onDelete(): void {
    this.service.delete(this.role.id).subscribe(d => {
      this.router.navigate(['/security/roles']);
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
