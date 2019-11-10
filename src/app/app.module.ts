import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApplicationComponent} from './application/application.component';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {FormsModule} from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';


@NgModule({
    declarations: [
        AppComponent,
        ApplicationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SelectDropDownModule,
        FormsModule,
        BrowserModule,
        MyDatePickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
