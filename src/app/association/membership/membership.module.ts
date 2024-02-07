import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeesModule } from '../fees/fees.module';
import { MembersModule } from '../members/members.module';
import { MembershipFrontpageComponent } from './components/membership-frontpage/membership-frontpage.component';
import { MembershipRoutingModule } from './membership-routing.module';
import { FeeFrontpageComponent } from './components/fee-frontpage/fee-frontpage.component';



@NgModule({
  declarations: [
    MembershipFrontpageComponent,
    FeeFrontpageComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    IconsModule,
    FontAwesomeModule,
    MembersModule,
    FeesModule
  ]
})
export class MembershipModule { }
