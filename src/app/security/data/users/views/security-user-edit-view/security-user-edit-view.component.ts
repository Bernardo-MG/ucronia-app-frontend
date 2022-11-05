import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  onSave(data: User): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
  }

  onDelete(): void {
    this.service.delete(this.user.id).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.user = d;
        });
      this.service.getRoles(identifier, { page: 0 })
        .subscribe(d => {
          this.roles = d.content;
        });
    }
  }

}
