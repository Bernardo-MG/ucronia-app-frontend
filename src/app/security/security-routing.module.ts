import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/security/layout/containers/security-layout/security-layout.container').then(m => m.SecurityLayoutContainer),
    children: [
      {
        // Root
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        // Roles
        path: 'roles',
        canActivate: [ResourceGuard("role", "view")],
        loadChildren: () => import('@app/security/roles/roles.module').then(m => m.RolesModule)
      },
      {
        // Users
        path: 'users',
        canActivate: [ResourceGuard("user", "view")],
        loadChildren: () => import('@app/security/users/users.module').then(m => m.UsersModule)
      },
      {
        // User tokens
        path: 'user-tokens',
        canActivate: [ResourceGuard("user_token", "view")],
        loadChildren: () => import('@app/security/user-tokens/user-tokens.module').then(m => m.UserTokensModule)
      },
      {
        // Security audit
        path: 'audit',
        canActivate: [ResourceGuard("user", "view")],
        loadChildren: () => import('@app/security/audit/audit.module').then(m => m.AuditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
