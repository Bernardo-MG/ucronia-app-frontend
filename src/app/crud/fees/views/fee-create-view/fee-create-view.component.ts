import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeeService } from '@app/crud/fees/services/fee.service';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-fee-create-view',
  templateUrl: './fee-create-view.component.html',
  styleUrls: ['./fee-create-view.component.sass']
})
export class FeeCreateViewComponent implements OnInit {

  public members: Member[] = [];

  public member = new Member();

  public fee: Fee = new Fee();

  public selectingMember = false;

  constructor(
    private service: FeeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.service.getAllMembers().subscribe(d => this.members = d);
  }

  public onSave(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/fees']);
    });
  }

  public onRequestMember(){
    this.selectingMember = true;
  }

  public onSelectMember(member: Member){
    this.member = member;
    this.selectingMember = false;
  }

}
