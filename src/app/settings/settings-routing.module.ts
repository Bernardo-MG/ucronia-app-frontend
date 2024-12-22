import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleLayoutComponent } from '@app/core/layout/components/simple-layout/simple-layout.component';
import { SettingsInfoEditorContainer } from './containers/settings-info-editor/settings-info-editor.container';


const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        component: SettingsInfoEditorContainer
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }