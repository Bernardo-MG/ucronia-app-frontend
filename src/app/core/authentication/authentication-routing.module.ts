import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './containers/login-view/login-view.component';
import { LoggedOutGuard } from './guards/logged-out.guard';


const routes: Routes = [
    {
        path: 'login', component: LoginViewComponent, canActivate: [LoggedOutGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }