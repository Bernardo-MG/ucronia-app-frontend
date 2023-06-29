import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-centered-frame',
  templateUrl: './centered-frame.component.html'
})
export class CenteredFrameComponent implements OnInit {

  public title = '';

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.title = this.layoutService.getTitle();
  }

}
