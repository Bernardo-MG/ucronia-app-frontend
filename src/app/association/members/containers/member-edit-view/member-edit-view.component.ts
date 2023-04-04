import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'admin-member-edit-view',
  templateUrl: './member-edit-view.component.html',
  styleUrls: ['./member-edit-view.component.sass']
})
export class MemberEditViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public formValid = false;

  public member: Member = new Member();

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
    this.waiting = true;
    this.service.update(this.member.id, this.member).subscribe({
      next: d => {
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Member) {
    this.member = value;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.member = d;
        });
    }
  }

}
