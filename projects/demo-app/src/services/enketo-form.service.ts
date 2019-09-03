import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { IEnketoFormService } from 'ng-enketo-form';

const FORM_URL = "https://forms-app-xslx-dev.s3.amazonaws.com/public";
const SUBMISSION_URL = "https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xsubmissions";


@Injectable()
export class EnketoFormService implements IEnketoFormService {

  constructor(private http: HttpClient) {}

  getForm(formId: string): Observable<any> {
    return this.http.get('assets/form-sample.json');
  }

  getSubmission(id: string): Observable<any> {
    return this.http.get<any>(`${SUBMISSION_URL}/${id}`);
  }

  addSubmission(data: any): Observable<any> {
    console.log('submitting form................');
    console.log(data);
    // const data = {content: };
    return null;
  }

  updateSubmission(submissionId: string, data: any): Observable<any> {
    console.log('updating submission..................');
    console.log(submissionId)
    console.log(data);
    return null;
  }
}
