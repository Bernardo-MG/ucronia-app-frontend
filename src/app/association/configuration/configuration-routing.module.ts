import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaddedFrameComponent } from '@app/core/layout/components/padded-frame/padded-frame.component';
import { ConfigurationInfoComponent } from './components/configuration-info/configuration-info.component';


const routes: Routes = [
  {
    path: '',
    component: PaddedFrameComponent,
    children: [
      { path: '', component: ConfigurationInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }