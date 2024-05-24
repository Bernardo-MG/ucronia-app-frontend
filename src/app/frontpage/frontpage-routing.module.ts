import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/views/activities/activities.component';
import { HighlightsComponent } from './components/views/highlights/highlights.component';
import { LocationComponent } from './components/views/location/location.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HighlightsComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'location', component: LocationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontpageRoutingModule { }