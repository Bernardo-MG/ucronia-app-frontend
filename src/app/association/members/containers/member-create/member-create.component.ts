import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-create',
  templateUrl: './member-create.component.html'
})
export class MemberCreateComponent implements OnInit {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

  public fields: FormDescription[];

  public form: FormGroup;

  public valid = false;

  constructor(
    private service: MemberService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.fields = service.getFields();
    this.form = fb.group({
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: [''],
      active: [true, Validators.required]
    });
  }

  public ngOnInit(): void {
    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public onSave(): void {
    const data: Member = this.form.value;
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if(error.failures){
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
