import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaddedFrameComponent } from '@app/core/layout/components/padded-frame/padded-frame.component';
import { ConfigurationDetailsComponent } from './components/configuration-details/configuration-details.component';


const routes: Routes = [
  {
    path: '',
    component: PaddedFrameComponent,
    children: [
      { path: '', component: ConfigurationDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }