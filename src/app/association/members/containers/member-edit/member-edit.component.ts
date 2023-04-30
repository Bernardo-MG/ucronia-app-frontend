import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/association/models/member';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { MemberService } from '../../services/member.service';
import { Failure } from '@app/core/api/models/failure';

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
    new FormDescription('Name', 'name', 'string', Validators.required),
    new FormDescription('Surname', 'surname', 'string'),
    new FormDescription('Identifier', 'identifier', 'string'),
    new FormDescription('Phone', 'phone', 'string'),
    new FormDescription('Active', 'active', 'boolean', Validators.required)
  ];

  public failures: Failure[] = [];

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
        this.failures = [];
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = error.failures;
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
