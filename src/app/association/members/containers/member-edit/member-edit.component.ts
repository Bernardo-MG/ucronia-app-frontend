import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-edit',
  templateUrl: './member-edit.component.html'
})
export class MemberEditComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public formValid = false;

  public member: Member = new Member();

  public failures: Failure[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: MemberService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.update(data.id, data).subscribe({
      next: d => {
        this.failures = [];
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = error.failures;
        // Reactivate view
        this.saving = false;
      }
    });
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
