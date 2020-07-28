import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from './shared/pipes/date.pipe';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'



@NgModule({
  declarations: [
    AppComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    Angular2FontawesomeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
