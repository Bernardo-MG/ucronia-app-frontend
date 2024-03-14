import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';
import { UserTokenInfoEditorComponent } from './components/user-token-info-editor/user-token-info-editor.component';

const routes: Routes = [
  { path: '', component: UserTokenFrontpageComponent },
  { path: ':token', component: UserTokenInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTokensRoutingModule { }