import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { UserTokenDetailsComponent } from './components/user-token-details/user-token-details.component';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';
import { UserTokenInfoComponent } from './components/user-token-info/user-token-info.component';
import { UserTokenSelectionListComponent } from './components/user-token-selection-list/user-token-selection-list.component';
import { UserTokensRoutingModule } from './user-tokens-routing.module';



@NgModule({
  declarations: [
    UserTokenFrontpageComponent,
    UserTokenSelectionListComponent,
    UserTokenDetailsComponent,
    UserTokenInfoComponent
  ],
  imports: [
    CommonModule,
    UserTokensRoutingModule,
    LayoutModule,
    PaginationModule,
    IconsModule
  ]
})
export class UserTokensModule { }
