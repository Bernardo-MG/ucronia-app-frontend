import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const memberModule = () => import('@app/admin/members/members.module').then(m => m.MembersModule);


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'member', loadChildren: memberModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }