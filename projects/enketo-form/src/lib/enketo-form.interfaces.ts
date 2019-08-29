import { Provider } from '@angular/core';
import { Observable } from "rxjs";

export interface IEnketoFormService {
  enketoFormServiceProvider?: Provider;
  enketoFormService?: {
    getForm?: (formId: string) => Observable<any>;
    getSubmission(submissionId: string): Observable<any>;
    addSubmission(data: string): Observable<any>;
    updateSubmission(submissionId: string, data: string): Observable<any>;
  }
}

// export interface IEnketoFormService {
//   // getForm?: (formId: string) => Observable<any>;
//   getForm(formId: string): Observable<any>;
//   getSubmission(submissionId: string): Observable<any>;
//   addSubmission(data: string): Observable<any>;
//   updateSubmission(submissionId: string, data: string): Observable<any>;
// }
