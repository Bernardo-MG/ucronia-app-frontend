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

  constructor(
    private service: FeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getAllMembers().subscribe(d => this.members = d);
  }

  save(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/fees']);
    });
  }

}
