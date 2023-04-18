import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRegisterViewComponent } from './containers/access-register-view/access-register-view.component';


const routes: Routes = [
    { path: 'register', component: AccessRegisterViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessRegisterRoutingModule { }