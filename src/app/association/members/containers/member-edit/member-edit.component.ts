import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { FormDescription } from '@app/shared/layout/models/form-description';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-edit',
  templateUrl: './member-edit.component.html'
})
export class MemberEditComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public formValid = false;

  public member: Member = new Member();

  public fields: FormDescription[] = [
    { name: 'Name', property: 'name', type: 'string', validator: Validators.required },
    { name: 'Surname', property: 'surname', type: 'string', validator: null },
    { name: 'Identifier', property: 'identifier', type: 'string', validator: null },
    { name: 'Phone', property: 'phone', type: 'string', validator: null },
    { name: 'Active', property: 'active', type: 'boolean', validator: Validators.required }
  ];

  constructor(
    private route: ActivatedRoute,
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
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        // Reactivate view
        this.saving = false;
      }
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
