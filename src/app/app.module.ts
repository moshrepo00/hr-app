import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApplicationComponent} from './application/application.component';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {FormsModule} from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';
import {HistoryComponent} from './history/history.component';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';



@NgModule({
    declarations: [
        AppComponent,
        ApplicationComponent,
        HistoryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SelectDropDownModule,
        FormsModule,
        BrowserModule,
        MyDatePickerModule,
        HttpClientModule,
        MomentModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
