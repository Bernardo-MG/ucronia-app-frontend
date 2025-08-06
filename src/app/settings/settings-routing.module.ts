import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
    data: { breadcrumb: 'Configuración' },
    children: [
      {
        path: '',
        canActivate: [ResourceGuard("association_settings", "view")],
        loadComponent: () => import('./containers/settings-edition/settings-edition.container').then(m => m.SettingsInfoEditorContainer)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }