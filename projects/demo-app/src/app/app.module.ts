import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EnketoFormModule } from 'ng-enketo-form';
import { ENKETO_FORM_SERVICE } from 'ng-enketo-form';
import { EnketoFormService } from '../services/enketo-form.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EnketoFormModule.forRoot({
      enketoFormServiceProvider: {
        provide: ENKETO_FORM_SERVICE,
        useClass: EnketoFormService
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
