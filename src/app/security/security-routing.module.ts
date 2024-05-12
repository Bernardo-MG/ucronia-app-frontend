import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityLayoutComponent } from '@app/access/layout/components/security-layout/security-layout.component';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';

const userModule = () => import('@app/access/users/users.module').then(m => m.UsersModule);
const userTokenModule = () => import('@app/access/user-tokens/user-tokens.module').then(m => m.UserTokensModule);
const rolesModule = () => import('@app/access/roles/roles.module').then(m => m.RolesModule);
const securityAuditModule = () => import('@app/access/audit/audit.module').then(m => m.AuditModule);

const routes: Routes = [
  {
    path: '',
    component: SecurityLayoutComponent,
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
