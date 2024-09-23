import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsInfoEditorComponent } from './components/views/settings-info-editor/settings-info-editor.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsInfoEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }