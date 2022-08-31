import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'member-edit-view',
  templateUrl: './member-edit-view.component.html',
  styleUrls: ['./member-edit-view.component.sass']
})
export class MemberEditViewComponent implements OnInit {

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
      this.router.navigate(['/members']);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.router.navigate(['/members']);
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
