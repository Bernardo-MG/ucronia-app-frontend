import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { FormDescription } from '@app/shared/edition/models/form-description';
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

  public editable = false;

  public deletable = false;

  public formValid = false;

  public member: Member = new Member();

  public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

  public fields: FormDescription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private authService: AuthService
  ) {
    this.fields = service.getFields();
  }

  public ngOnInit(): void {
    this.editable = this.authService.hasPermission("member", "update");
    this.deletable = this.authService.hasPermission("member", "delete");

    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.update(data.id, data).subscribe({
      next: d => {
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = this.getFailures(error.failures);
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

  private getFailures(values: Failure[]) {
    const fieldFailures = new Map<string, Failure[]>();
    for (const failure of values) {
      if (failure.field) {
        if (fieldFailures.get(failure.field)) {
          const values = (fieldFailures.get(failure.field) as Failure[]);
          values.push(failure);
          fieldFailures.set(failure.field, values);
        } else {
          fieldFailures.set(failure.field, [failure]);
        }
      }
    }

    return fieldFailures;
  }

}
