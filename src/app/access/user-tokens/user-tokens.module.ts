import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';
import { UserTokenInfoEditorComponent } from './components/user-token-info-editor/user-token-info-editor.component';
import { UserTokenInfoComponent } from './components/user-token-info/user-token-info.component';
import { UserTokenSelectionListComponent } from './components/user-token-selection-list/user-token-selection-list.component';
import { UserTokensRoutingModule } from './user-tokens-routing.module';



@NgModule({
  declarations: [
    UserTokenFrontpageComponent,
    UserTokenSelectionListComponent,
    UserTokenInfoEditorComponent,
    UserTokenInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserTokensRoutingModule,
    LayoutModule,
    PaginationModule,
    IconsModule
  ]
})
export class UserTokensModule { }
