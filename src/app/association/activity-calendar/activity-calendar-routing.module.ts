import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityCalendarFrontpageContainer } from './containers/activity-calendar-frontpage/activity-calendar-frontpage.container';


const routes: Routes = [
  { path: '', component: ActivityCalendarFrontpageContainer }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityCalendarRoutingModule { }
