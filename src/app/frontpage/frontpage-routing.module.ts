import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameLayoutComponent } from '@app/core/layout/components/layout-main-frame/layout-main-frame.component';
import { HighlightsComponent } from './highlights/highlights.component';


const routes: Routes = [
    {
        path: '',
        component: MainFrameLayoutComponent,
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