import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/models/member';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-edit-view',
  templateUrl: './admin-member-edit-view.component.html',
  styleUrls: ['./admin-member-edit-view.component.sass']
})
export class AdminMemberEditViewComponent implements OnInit {

  @Output() back = new EventEmitter<void>();
  
  @Input() member: Member = new Member();

  constructor(
    private route: ActivatedRoute,
    private service: AdminMemberService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  save(data: Member): void {
    this.service.update(data);
  }

  delete(id: number): void {
    this.service.delete(id);
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getMember(identifier)
        .subscribe(d => {
          this.member = d;
        });
    }
  }

}
