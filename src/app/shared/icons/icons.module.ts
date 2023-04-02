import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CueLoadingComponent } from './components/icon-waiting/icon-waiting.component';
import { BackwardIconComponent } from './components/icon-backward/icon-backward.component';
import { IconCreateComponent } from './components/icon-create/icon-create.component';
import { DeleteIconComponent } from './components/icon-delete/icon-delete.component';
import { IconEditComponent } from './components/icon-edit/icon-edit.component';
import { FastBackwardIconComponent } from './components/icon-fast-backward/icon-fast-backward.component';
import { FastForwardIconComponent } from './components/icon-fast-forward/icon-fast-forward.component';
import { ForwardIconComponent } from './components/icon-forward/icon-forward.component';
import { LogoutIconComponent } from './components/icon-logout/icon-logout.component';
import { IconSearchComponent } from './components/icon-search/icon-search.component';



@NgModule({
  declarations: [
    BackwardIconComponent,
    ForwardIconComponent,
    FastBackwardIconComponent,
    FastForwardIconComponent,
    LogoutIconComponent,
    CueLoadingComponent,
    DeleteIconComponent,
    IconCreateComponent,
    IconEditComponent,
    IconSearchComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BackwardIconComponent,
    ForwardIconComponent,
    FastBackwardIconComponent,
    FastForwardIconComponent,
    LogoutIconComponent,
    CueLoadingComponent,
    DeleteIconComponent,
    IconCreateComponent,
    IconEditComponent,
    IconSearchComponent
  ]
})
export class IconsModule { }
