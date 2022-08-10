import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/models/member';
import { faArrowLeftLong, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-edit-view',
  templateUrl: './admin-member-edit-view.component.html',
  styleUrls: ['./admin-member-edit-view.component.sass']
})
export class AdminMemberInfoViewComponent {

  @Output() back = new EventEmitter<void>();

  public member = this.fb.group({
    id: [-1, Validators.required],
    name: ['', Validators.required]
  });

  public backIcon = faArrowLeftLong;
  public saveIcon = faFloppyDisk;
  public deleteIcon = faTrashCan;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private service: AdminMemberService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const data = new Member();
    if (this.member.value.id) {
      data.id = this.member.value.id;
    }
    if (this.member.value.name) {
      data.name = this.member.value.name;
    }

    this.service.update(data);
  }

  delete(): void {
    if (this.member.value.id) {
      this.service.delete(this.member.value.id);
    }
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getMember(identifier)
        .subscribe(d => {
          if (d) {
            this.member.patchValue(d);
          } else {
            this.member.patchValue(new Member());
          }
        });
    }
  }

}
