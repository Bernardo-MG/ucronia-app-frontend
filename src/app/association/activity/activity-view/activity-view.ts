import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ActivityList } from '../activity-list/activity-list';

@Component({
  imports: [PanelModule, ActivityList],
  templateUrl: './activity-view.html'
})
export class ActivityView {

}
