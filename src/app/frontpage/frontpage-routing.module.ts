import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { HighlightsComponent } from './components/highlights/highlights.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HighlightsComponent },
      { path: 'activities', component: ActivitiesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontpageRoutingModule { }