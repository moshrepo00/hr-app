import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationComponent} from './application/application.component';
import {HistoryComponent} from './history/history.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'apply'
    },
    {
        path: 'apply',
        component: ApplicationComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
