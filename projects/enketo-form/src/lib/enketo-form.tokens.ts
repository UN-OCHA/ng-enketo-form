import { InjectionToken } from '@angular/core';
import { IEnketoFormServiceProvider } from './enketo-form.interfaces';

export const ENKETO_FORM_SERVICE = new InjectionToken<IEnketoFormServiceProvider>(
  'ENKETO_FORM_SERVICE'
);
