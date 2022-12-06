import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-edit-view',
  templateUrl: './member-edit-view.component.html',
  styleUrls: ['./member-edit-view.component.sass']
})
export class MemberEditViewComponent implements OnInit {

  member: Member = new Member();

  private formValid = false;

  constructor(
    private route: ActivatedRoute,
    private service: MemberService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(): void {
    this.service.update(this.member.id, this.member).subscribe();
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Member) {
    this.member = value;
  }

  public isAbleToSave() {
    return this.formValid;
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
