import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighlightsComponent } from './components/highlights/highlights.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HighlightsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontpageRoutingModule { }