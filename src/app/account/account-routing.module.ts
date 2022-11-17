import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsViewComponent } from './views/account-settings-view/account-settings-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'settings', component: AccountSettingsViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }