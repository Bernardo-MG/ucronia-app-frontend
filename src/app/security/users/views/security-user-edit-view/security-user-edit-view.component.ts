import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/security/models/user';
import { SecurityUserService } from '../../service/security-user.service';

@Component({
  selector: 'security-user-edit-view',
  templateUrl: './security-user-edit-view.component.html',
  styleUrls: ['./security-user-edit-view.component.sass']
})
export class SecurityUserEditViewComponent implements OnInit {

  role: User = new User();

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

  save(data: User): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.router.navigate(['/security/users']);
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.role = d;
        });
    }
  }

}
