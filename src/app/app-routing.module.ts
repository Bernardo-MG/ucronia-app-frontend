import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/containers/login/login.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { CenteredLayoutComponent } from './core/layout/containers/centered-layout/centered-layout.component';
import { HeaderLayoutComponent } from './core/layout/containers/header-layout/header-layout.component';
import { AccountLayoutComponent } from './account/containers/account-layout/account-layout.component';
import { MainLayoutComponent } from './core/layout/containers/main-layout/main-layout.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const accessModule = () => import('@app/access/access.module').then(m => m.AccessModule);

const routes: Routes = [
  // Main app
  {
    path: '',
    component: HeaderLayoutComponent,
    children: [
      // Login
      {
        path: 'login',
        component: CenteredLayoutComponent,
        canActivate: [LoggedOutGuard],
        children: [
          {
            path: '', component: LoginComponent
          }
        ]
      },
      // Association
      {
        path: '',
        component: MainLayoutComponent,
        canActivate: [LoggedInGuard],
        children: [
          // Front page
          { path: '', loadChildren: frontpageModule },
          // Association
          { path: '', loadChildren: associationModule },
          // Security
          { path: 'security', loadChildren: accessModule }
        ]
      },
      // Account
      {
        path: 'account',
        component: AccountLayoutComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', loadChildren: accountModule }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
