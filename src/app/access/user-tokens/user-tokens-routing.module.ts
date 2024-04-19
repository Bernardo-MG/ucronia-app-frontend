import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';
import { UserTokenInfoEditorComponent } from './components/user-token-info-editor/user-token-info-editor.component';

const routes: Routes = [
  { path: '', component: UserTokenFrontpageComponent },
  { path: ':token', component: UserTokenInfoEditorComponent, canActivate: [ResourceGuard("user_token", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTokensRoutingModule { }