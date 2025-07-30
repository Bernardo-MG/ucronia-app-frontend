import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
    data: { breadcrumb: 'Configuración' },
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/settings-info-editor/settings-info-editor.container').then(m => m.SettingsInfoEditorContainer)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }