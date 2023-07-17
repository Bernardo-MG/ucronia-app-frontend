import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account/components/account-layout/account-layout.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { CenteredFrameComponent } from './core/layout/components/centered-frame/centered-frame.component';
import { NavbarBodyComponent } from './core/layout/components/navbar-body/navbar-body.component';
import { PaddedFrameComponent } from './core/layout/components/padded-frame/padded-frame.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const accessModule = () => import('@app/access/access.module').then(m => m.AccessModule);

const routes: Routes = [
  // Main app
  {
    path: '',
    children: [
      {
        path: 'login',
        component: NavbarBodyComponent,
        children: [
          // Login
          {
            path: '',
            component: CenteredFrameComponent,
            canActivate: [LoggedOutGuard],
            children: [
              {
                path: '', component: LoginComponent
              }
            ]
          }
        ]
      },
      {
        path: '',
        component: NavbarBodyComponent,
        children: [
          // Association
          {
            path: '',
            component: PaddedFrameComponent,
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
