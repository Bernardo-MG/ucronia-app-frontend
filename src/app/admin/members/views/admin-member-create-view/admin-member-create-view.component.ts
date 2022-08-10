import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/models/member';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-create-view',
  templateUrl: './admin-member-create-view.component.html',
  styleUrls: ['./admin-member-create-view.component.sass']
})
export class AdminMemberCreateViewComponent {

  public member = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private service: AdminMemberService
  ) { }

  save(): void {
    const data = new Member();
    if (this.member.value.name) {
      data.name = this.member.value.name;
    }

    this.service.create(data);
  }

}
