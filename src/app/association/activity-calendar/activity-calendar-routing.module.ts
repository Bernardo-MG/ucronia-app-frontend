import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/activity-calendar-frontpage/activity-calendar-frontpage.container').then(m => m.ActivityCalendarFrontpageContainer),
    data: { breadcrumb: 'Actividades' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityCalendarRoutingModule { }
