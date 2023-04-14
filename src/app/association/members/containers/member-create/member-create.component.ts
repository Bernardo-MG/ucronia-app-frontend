import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { FormDescription } from '@app/shared/layout/models/form-description';
import { MemberService } from '../../services/member.service';
import { Validators } from '@angular/forms';

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

  public fields: FormDescription[] = [
    { name: 'Name', property: 'name', type: 'string', validator: Validators.required },
    { name: 'Surname', property: 'surname', type: 'string', validator: null },
    { name: 'Identifier', property: 'identifier', type: 'string', validator: null },
    { name: 'Phone', property: 'phone', type: 'string', validator: null },
    { name: 'Active', property: 'active', type: 'boolean', validator: Validators.required }
  ];

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.create(data).subscribe({
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

}
