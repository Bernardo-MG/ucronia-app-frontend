import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '@app/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'admin-member-edit-view',
  templateUrl: './admin-member-edit-view.component.html',
  styleUrls: ['./admin-member-edit-view.component.sass']
})
export class AdminMemberEditViewComponent implements OnInit {

  member: Member = new Member();

  constructor(
    private route: ActivatedRoute,
    private service: MemberService,
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
