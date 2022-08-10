import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '@app/models/member';
import { faArrowLeftLong, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'app-admin-member-create-view',
  templateUrl: './admin-member-create-view.component.html',
  styleUrls: ['./admin-member-create-view.component.sass']
})
export class AdminMemberCreateViewComponent {

  member = this.fb.group({
    name: ['', Validators.required]
  });

  public backIcon = faArrowLeftLong;
  public saveIcon = faFloppyDisk;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private service: AdminMemberService
  ) { }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const data = new Member();
    if(this.member.value.name){
      data.name = this.member.value.name;
    }

    this.service.create(data);
  }

}
