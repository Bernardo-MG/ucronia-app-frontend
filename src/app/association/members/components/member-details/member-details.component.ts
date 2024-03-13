import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';
import { throwError } from 'rxjs';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-details',
  templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent extends InfoEditorComponent implements OnInit {

  public member = new Member();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private authContainer: AuthContainer
  ) {
    super();
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("member", "update");
    this.deletable = this.authContainer.hasPermission("member", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('number'));
    });
  }

  public onSave(toSave: Member): void {
    this.saving = true;
    this.service.update(this.member.number, toSave).subscribe({
      next: d => {
        this.member = d;

        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.member.number).subscribe(r => {
      this.router.navigate([`/membership`]);
    });
  }

  private load(id: string | null): void {
    if (id) {
      this.reading = true;
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe({
          next: d => {
            this.member = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

}
