import { NgModule } from '@angular/core';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LayoutModule } from './layout/layout.module';
import { MenusModule } from './menus/menus.module';



@NgModule({
  imports: [
    MenusModule,
    LayoutModule,
    PaginationModule,
    AuthenticationModule
  ],
  exports: [
    MenusModule,
    LayoutModule,
    PaginationModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
