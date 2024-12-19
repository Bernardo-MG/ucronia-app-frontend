import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { PeopleCreateContainer } from './containers/people-create/people-create.container';
import { PeopleFrontpageContainer } from './containers/people-frontpage/people-frontpage.container';
import { PeopleInfoEditorContainer } from './containers/people-info-editor/people-info-editor.container';


const routes: Routes = [
  { path: '', component: PeopleFrontpageContainer, canActivate: [ResourceGuard("person", "read")] },
  { path: 'register', component: PeopleCreateContainer, canActivate: [ResourceGuard("person", "create")] },
  { path: ':number', component: PeopleInfoEditorContainer, canActivate: [ResourceGuard("person", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }