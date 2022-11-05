import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/security/models/role';
import { SecurityRoleService } from '../../service/security-role.service';

@Component({
  selector: 'security-role-create-view',
  templateUrl: './security-role-create-view.component.html',
  styleUrls: ['./security-role-create-view.component.sass']
})
export class SecurityRoleCreateViewComponent {

  constructor(
    private service: SecurityRoleService,
    private router: Router
  ) { }

  onSave(data: Role): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/security/roles']);
    });
  }

}
