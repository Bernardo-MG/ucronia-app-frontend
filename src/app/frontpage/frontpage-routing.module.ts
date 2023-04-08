import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameComponent } from '@app/core/layout/components/main-frame/main-frame.component';
import { HighlightsComponent } from './highlights/highlights.component';


const routes: Routes = [
    {
        path: '',
        component: MainFrameComponent,
        children: [
            { path: '', component: HighlightsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontpageRoutingModule { }