import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/models/member';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-edit-view',
  templateUrl: './admin-member-edit-view.component.html',
  styleUrls: ['./admin-member-edit-view.component.sass']
})
export class AdminMemberEditViewComponent implements OnInit {

  member: Member = new Member();

  constructor(
    private route: ActivatedRoute,
    private service: AdminMemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  save(data: Member): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/admin/member']);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.router.navigate(['/admin/member']);
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.member = d;
        });
    }
  }

}
