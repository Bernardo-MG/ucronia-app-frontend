import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationInfoEditorComponent } from './components/configuration-info-editor/configuration-info-editor.component';


const routes: Routes = [
  {
    path: '',
    component: ConfigurationInfoEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }