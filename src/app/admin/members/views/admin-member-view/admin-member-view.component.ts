import { Component, OnInit } from '@angular/core';
import { MemberStats } from '../../models/member-stats';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'app-admin-member-view',
  templateUrl: './admin-member-view.component.html',
  styleUrls: ['./admin-member-view.component.sass']
})
export class AdminMemberViewComponent implements OnInit {

  public stats = new MemberStats();

  constructor(
    private service: AdminMemberService
  ) { }

  ngOnInit(): void {
    this.service.getStatus().subscribe(s => this.stats = s);
  }

}
