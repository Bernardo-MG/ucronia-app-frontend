import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationLayoutComponent } from './components/configuration-layout/configuration-layout.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';


const routes: Routes = [
  {
    path: '',
    component: ConfigurationLayoutComponent,
    children: [
      { path: '', component: ConfigurationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }