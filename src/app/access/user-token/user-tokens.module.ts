import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserTokensRoutingModule } from './user-tokens-routing.module';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';



@NgModule({
  declarations: [
    UserTokenFrontpageComponent
  ],
  imports: [
    CommonModule,
    UserTokensRoutingModule
  ]
})
export class UserTokensModule { }
