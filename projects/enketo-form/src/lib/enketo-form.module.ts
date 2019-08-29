import { ModuleWithProviders, NgModule } from '@angular/core';
import { IEnketoFormService } from './enketo-form.interfaces';
import { ENKETO_FORM_SERVICE } from './enketo-form.tokens';
import { EnketoFormComponent } from './enketo-form.component';

@NgModule({
  declarations: [EnketoFormComponent],
  imports: [
  ],
  exports: [EnketoFormComponent]
})
export class EnketoFormModule {
  static forRoot(svc: IEnketoFormService): ModuleWithProviders {
    return {
      ngModule: EnketoFormModule,
      providers: [
        {
          provide: ENKETO_FORM_SERVICE,
          useValue: svc
        }
      ]
    };
  }
}
