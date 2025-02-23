import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '../../../projects/bernardo-mg/authentication/src/lib/guards/resource.guard';
import { SecurityLayoutContainer } from '@app/core/layout/containers/security-layout/security-layout.container';

const userModule = () => import('@app/security/users/users.module').then(m => m.UsersModule);
const userTokenModule = () => import('@app/security/user-tokens/user-tokens.module').then(m => m.UserTokensModule);
const rolesModule = () => import('@app/security/roles/roles.module').then(m => m.RolesModule);
const securityAuditModule = () => import('@app/security/audit/audit.module').then(m => m.AuditModule);

const routes: Routes = [
  {
    path: '',
    component: SecurityLayoutContainer,
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
        loadChildren: rolesModule
      },
      {
        // Users
        path: 'users',
        canActivate: [ResourceGuard("user", "view")],
        loadChildren: userModule
      },
      {
        // User tokens
        path: 'user-tokens',
        canActivate: [ResourceGuard("user_token", "view")],
        loadChildren: userTokenModule
      },
      {
        // Security audit
        path: 'audit',
        canActivate: [ResourceGuard("user", "view")],
        loadChildren: securityAuditModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
