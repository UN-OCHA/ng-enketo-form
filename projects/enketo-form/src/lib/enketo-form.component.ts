import $ from 'jquery';
import { Form } from 'enketo-core';
import { Component, Input, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnketoFormService } from './enketo-form.interfaces';
import { ENKETO_FORM_SERVICE } from './enketo-form.tokens';
import EnketoForm from './enketo-form';


@Component({
  selector: 'enketo-form',
  templateUrl: './enketo-form.component.html',
  styleUrls: ['./enketo-form.component.scss']
})
export class EnketoFormComponent implements OnInit {
  // getForm: (formId: string) => Observable<any>;
  // getSubmission: (submissionId: string) => Observable<any>;
  // addSubmission: (data: string) => Observable<any>;
  // updateSubmission: (submissionId: string, data: string) => Observable<any>;

  @Input() formId: string;
  @Input() submissionId: string;
  @Input() editable: string;

  public mode: string;
  private xform: any;
  private eform: any;

  // constructor(@Inject(ENKETO_FORM_SERVICE) private svc: IEnketoFormService) { }
  constructor(@Inject(ENKETO_FORM_SERVICE) private svc: any) {
    console.log('===============================');
    console.log('===============================');
    console.log(svc);
    console.log('===============================');
    console.log('===============================');
  }
  // constructor(@Inject(ENKETO_FORM_SERVICE) svc: any) {
  //   console.log('===============================');
  //   console.log('===============================');
  //   console.log(svc);
  //   this.svc = svc;
  //   // this.getForm = svc.getForm || function() {};
  //   // this.getSubmission = svc.getSubmission || function() {};
  //   // this.addSubmission = svc.addSubmission || function() {};
  //   // this.updateSubmission = svc.updateSubmission || function() {};
  //   console.log('===============================');
  //   console.log('===============================');
  // }

  currentMode() {
    if(!this.submissionId) {
      return 'ENTRY MODE';
    }
    if(this.editable === 'false') {
      return 'READ ONLY';
    }
    return 'EDIT MODE';
  }

  async ngOnInit() {
    this.mode = this.currentMode();

    if(this.formId) {
      this.svc.getForm(this.formId).subscribe(xdata => {
        this.eform = new EnketoForm(xdata.form, xdata.model, null);
      });
    } else {
      this.svc.getSubmission(this.submissionId).subscribe(data => {
        this.xform = {name: data.form, content: data.content, loading: false}
        this.svc.getForm(this.xform.name).subscribe(xdata => {
          const content = JSON.parse(this.xform.content);
          this.eform = new EnketoForm(xdata.form, xdata.model, content);
          if(this.editable === 'false') {
            this.disableInputs();
          }
        });
      });
    }
  }

  disableInputs() {
    $('#form :input:not(:button)').each(function(x) {
      $(this).prop('disabled', true);
    });
  }

  async handleSubmit() {
    const data = this.eform.getData();
    if (this.formId) {
      this.svc.addSubmission(data);  // .subscribe(data =>{});
    } else if(this.submissionId && this.editable !== 'false') {
      this.svc.updateSubmission(this.submissionId, data);  // .subscribe(data =>{});
    }
  }
}
