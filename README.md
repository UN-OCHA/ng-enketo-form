# NgEnketoForm

Enketo Form for Angular 7


## Installation

```
npm install ng-enketo-form
```

## Usage

The `enketo-form` module allows to capture, edit and view form data.

### First. Configure the module in your app.

```js
import { EnketoFormModule } from 'enketo-form';
import { ENKETO_FORM_SERVICE } from 'enketo-form';
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
```

### Second. Provide your service implementation.
```js
import { IEnketoFormService } from 'enketo-form';

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

### Lastly. Render the form.

```html
  <enketo-form formId="form1"></enketo-form> // To capture data
  <enketo-form submissionId="123"></enketo-form> // To edit data
  <enketo-form submissionId="123" editable="false"></enketo-form> // Read only
```
