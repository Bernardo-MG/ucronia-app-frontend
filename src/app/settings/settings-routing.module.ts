import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleLayoutContainer } from '@app/core/layout/containers/simple-layout/simple-layout.container';
import { SettingsInfoEditorContainer } from './containers/settings-info-editor/settings-info-editor.container';


const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutContainer,
    data: { breadcrumb: 'Configuración' },
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