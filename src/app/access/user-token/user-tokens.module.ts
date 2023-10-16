import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';
import { UserTokenSelectionListComponent } from './components/user-token-selection-list/user-token-selection-list.component';
import { UserTokensRoutingModule } from './user-tokens-routing.module';



@NgModule({
  declarations: [
    UserTokenFrontpageComponent,
    UserTokenSelectionListComponent
  ],
  imports: [
    CommonModule,
    UserTokensRoutingModule,
    LayoutModule,
    PaginationModule
  ]
})
export class UserTokensModule { }
