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
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public error = false;

  public data = new Member();

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authService.hasPermission("member", "update");
    this.deletable = this.authService.hasPermission("member", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(toSave: Member): void {
    this.data = toSave;
    this.saving = true;
    this.service.update(this.data.id, this.data).subscribe({
      next: d => {
        this.failures = {};
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
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

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
  }

  private load(id: string | null): void {
    if (id) {
      this.reading = true;
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe({
          next: d => {
            this.data = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

}
