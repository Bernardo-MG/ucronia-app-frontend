import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-details',
  templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;
  
  public editable = true;

  public formValid = false;

  public member: Member = new Member();

  public failures: Failure[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  public onDelete(data: Member): void {
    this.service.delete(data.id).subscribe(r => {
      this.router.navigate([`/members/list`]);
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
