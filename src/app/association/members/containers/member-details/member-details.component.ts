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
    this.editable = this.authService.hasPermission("member", "update");
    this.deletable = this.authService.hasPermission("member", "delete");

    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
    this.listenForChanges();
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
        if(error.failures){
          this.failures = this.getFailures(error.failures);
        } else {
          this.failures = new Map<string, Failure[]>();
        }
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

  public onEdit(): void {
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

  private listenForChanges() {
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public isEditable() {
    return this.editable && this.editing;
  }

}
