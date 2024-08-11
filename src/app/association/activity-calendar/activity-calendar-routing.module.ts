import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityCalendarFrontpageComponent } from './components/activity-calendar-frontpage/activity-calendar-frontpage.component';


const routes: Routes = [
  { path: '', component: ActivityCalendarFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityCalendarRoutingModule { }
