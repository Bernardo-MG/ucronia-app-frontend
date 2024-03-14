import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberBalanceChartComponent } from './components/member-balance-chart/member-balance-chart.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MemberInfoEditorComponent } from './components/member-info-editor/member-info-editor.component';
import { MemberInfoComponent } from './components/member-info/member-info.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberBalanceService } from './services/member-balance.service';
import { MemberService } from './services/member.service';



@NgModule({
  declarations: [
    MemberInfoEditorComponent,
    MemberCreateComponent,
    MemberFormComponent,
    MemberInfoComponent,
    MemberListComponent,
    MemberBalanceChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    IconsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    MemberInfoEditorComponent,
    MemberCreateComponent,
    MemberFormComponent,
    MemberInfoComponent,
    MemberListComponent,
    MemberBalanceChartComponent
  ],
  providers: [
    MemberService,
    MemberBalanceService
  ]
})
export class MembersModule { }
