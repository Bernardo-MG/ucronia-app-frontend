import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityCalendarWidgetComponent } from './components/activity-calendar-widget/activity-calendar-widget.component';


const routes: Routes = [
  { path: '', component: ActivityCalendarWidgetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityCalendarRoutingModule { }
