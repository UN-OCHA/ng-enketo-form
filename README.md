# NgEnketoForm

Enketo Form for Angular 7


## Installation

```
# Installation with npm
npm install ng-enketo-form

# Installation with yarn
yarn add ng-enketo-form
```

## Usage

The `enketo-form` module allows to capture, edit and view form data.

#### First. Add and configure the EnketoFormModule in your app.

```js
import { EnketoFormModule } from 'ng-enketo-form';
import { ENKETO_FORM_SERVICE } from 'ng-enketo-form';
import { EnketoFormService } from '../services/enketo-form.service';// your service

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
```

#### Second. Provide your implementation for the IEnketoFormService interface.
```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IEnketoFormService } from 'ng-enketo-form';

@Injectable()
export class EnketoFormService implements IEnketoFormService {

  constructor(private http: HttpClient) {}

  getForm(formId: string): Observable<any> {
    return this.http.get('assets/form-sample.json');
  }

  getSubmission(id: string): Observable<any> {
    ...
  }

  addSubmission(data: any): Observable<any> {
    ...
  }

  updateSubmission(submissionId: string, data: any): Observable<any> {
    ...
  }
}
```

#### Lastly. Render the form.

```html
  <enketo-form formId="form1"></enketo-form> // To capture data
  <enketo-form submissionId="123"></enketo-form> // To edit data
  <enketo-form submissionId="123" editable="false"></enketo-form> // To view submission (read only)
```

## IEnketoFormService

#### `getForm(formId: string): Observable<any>`
Returns a form that was generated with the `enketo-transformer` library.

#### `getSubmission(submissionId: string): Observable<any>`
Returns the submission captured in addSubmission; it also includes the form used to capture the data.

#### `addSubmission(data: string): Observable<any>`
Provides the data captured from the form when clicking the submit button.

#### `updateSubmission(submissionId: string, data: string): Observable<any>`
Provides the data captured from the form when clicking the update button.

## Run local demo app
```
npm i
ng build enketo-form
ng serve demo-app
```

## Publish this library
```sh
//update version in projects/enketo-form/src/package.json
ng build enketo-form
cd dist/enketo-form
npm publish --tag beta
```

## TODO
1. Add tests/travis.
2. Provide default css to identify the elements that can be overwritten. The demo app currently styles the form with demo-app/src/assets/styles/grid.css
3. Enhance service to define the type of the observable responses/returns.
4. Extend service interface with addFile/getFile or something similar to support file attachments (images, etc).
5. Extend service interface to provide getExternal or similar to support external data options; select options driven with dynamic data.
