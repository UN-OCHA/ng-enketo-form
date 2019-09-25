import { Provider } from '@angular/core';
import { Observable } from "rxjs";

export interface IEnketoFormServiceProvider {
  enketoFormServiceProvider: Provider;
}

export interface IEnketoFormService {
  getForm(formId: any): Observable<any>;
  getSubmission(formId: any, submissionId: any): Observable<any>;
  addSubmission(formId: any, submissionId: any, data: string): Observable<any>;
  updateSubmission(formId: any, submissionId: any, data: string): Observable<any>;
}
