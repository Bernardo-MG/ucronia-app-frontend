import { Component, OnInit } from '@angular/core';
import { AssociationStatsService } from '../../services/association-stats.service';

@Component({
  selector: 'assoc-member-stats',
  templateUrl: './member-stats.component.html'
})
export class MemberStatsComponent implements OnInit {

  public activeCount = 0;

  constructor(
    private service: AssociationStatsService
  ) { }

  ngOnInit(): void {
    this.service.countActiveMembers().subscribe(r => this.activeCount = r);
  }

}
