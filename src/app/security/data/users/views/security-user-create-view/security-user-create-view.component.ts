import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/security/models/user';
import { SecurityUserService } from '../../service/security-user.service';

@Component({
  selector: 'security-user-create-view',
  templateUrl: './security-user-create-view.component.html',
  styleUrls: ['./security-user-create-view.component.sass']
})
export class SecurityUserCreateViewComponent {

  constructor(
    private service: SecurityUserService,
    private router: Router
  ) { }

  onSave(data: User): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
  }

}
