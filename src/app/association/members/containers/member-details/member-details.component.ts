import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { MemberService } from '../../services/member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public data: Member = new Member();

  public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

  public fields: FormDescription[];

  public form: FormGroup;

  public valid = false;

  public editing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.fields = service.getFields();
    this.form = fb.group({
      id: [-1],
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: [''],
      active: [true, Validators.required]
    });
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authService.hasPermission("member", "update");
    this.deletable = this.authService.hasPermission("member", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });

    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public onSave(): void {
    const data: Member = this.form.value;
    this.saving = true;
    this.service.update(data.id, data).subscribe({
      next: d => {
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onDelete(): void {
    const data: Member = this.form.value;
    this.service.delete(data.id).subscribe(r => {
      this.router.navigate([`/members/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.data = d;
          this.form.patchValue(this.data);
        });
    }
  }

  public isEditable() {
    return this.editable && this.editing;
  }

  public isSaveDisabled() {
    return !this.editable || !this.editing || !this.isAbleToSave();
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

  public isAbleToEdit() {
    return !this.saving && this.editable && this.editing;
  }

  public isAbleToDelete() {
    return !this.saving && this.deletable && !this.editing;
  }

}
