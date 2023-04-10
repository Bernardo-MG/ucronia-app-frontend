import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { FormDescription } from '@app/shared/layout/models/form-description';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.sass']
})
export class MemberCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public formValid = false;

  public fields: FormDescription[] = [
    { name: 'Name', property: 'name', type: 'string' },
    { name: 'Surname', property: 'surname', type: 'string' },
    { name: 'Identifier', property: 'identifier', type: 'string' },
    { name: 'Phone', property: 'phone', type: 'string' },
    { name: 'Active', property: 'active', type: 'boolean' }
  ];

  private member = new Member();

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(): void {
    this.saving = true;
    this.service.create(this.member).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Member) {
    this.member = value;
  }

}
