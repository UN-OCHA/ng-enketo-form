import { InjectionToken } from '@angular/core';
import { IEnketoFormService } from './enketo-form.interfaces';

export const ENKETO_FORM_SERVICE = new InjectionToken<IEnketoFormService>(
  'ENKETO_FORM_SERVICE'
);
