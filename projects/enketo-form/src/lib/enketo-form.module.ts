import { ModuleWithProviders, NgModule } from '@angular/core';
// import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
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

  // constructor(@Optional() @SkipSelf() parentModule: EnketoFormModule) {
  //   if (parentModule) {
  //     throw new Error('EnketoFormModule is already loaded. It should only be imported in your application\'s main module.');
  //   }
  // }

  static forRoot(service: IEnketoFormService): ModuleWithProviders {
    return {
      ngModule: EnketoFormModule,
      providers: [
        service.enketoFormServiceProvider
        //  || {
        //   provide: ENKETO_FORM_SERVICE,
        //   useValue: service.enketoFormService
        // }
      ]
      // providers: [
      //   // service.enketoFormServiceProvider ||
      //   {
      //     provide: ENKETO_FORM_SERVICE,
      //     useValue: service
      //   }
      // ]
    };
  }
}
