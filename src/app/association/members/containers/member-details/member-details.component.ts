import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
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

  public editing = false;

  public valid = false;

  public editPermission = false;

  public deletePermission = false;

  public data = new Member();

  public failures = new Map<string, Failure[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editPermission = this.authService.hasPermission("member", "update");
    this.deletePermission = this.authService.hasPermission("member", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(toSave: Member): void {
    this.data = toSave;
    this.saving = true;
    this.service.update(this.data.id, this.data).subscribe({
      next: d => {
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.id).subscribe(r => {
      this.router.navigate([`/members/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public onChange(changed: Member) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.data = d;
        });
    }
  }

  public isEditable() {
    return this.editPermission && this.editing;
  }

}
