import $ from 'jquery';
import { Form } from 'enketo-core';
import { Component, Input, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkdownService } from 'ngx-markdown';
import { IEnketoFormService } from './enketo-form.interfaces';
import { ENKETO_FORM_SERVICE } from './enketo-form.tokens';
import EnketoForm from './enketo-form';


@Component({
  selector: 'enketo-form',
  templateUrl: './enketo-form.component.html',
  styleUrls: ['./enketo-form.component.scss']
})
export class EnketoFormComponent implements OnInit {

  @Input() formId: string;
  @Input() submissionId: string;
  @Input() editable: string;

  public mode: string;
  private xform: any;
  private eform: any;

  constructor(
    @Inject(ENKETO_FORM_SERVICE) private svc: IEnketoFormService,
    private md: MarkdownService) { }

  currentMode() {
    if(!this.submissionId) {
      return 'ENTRY MODE';
    }
    if(this.editable === 'false') {
      return 'READ ONLY';
    }
    return 'EDIT MODE';
  }

  private html(form) {
    const html = $(form);
    const that = this;
    $('.question-label', html).each(function (idx) {
      const text = $(this).text().replace(/\n/g, '<br />');
      $(this).html(that.md.compile(text));
    });
    return html;
  }

  async ngOnInit() {
    this.mode = this.currentMode();

    if(this.formId && this.submissionId) {
      this.svc.getSubmission(this.formId, this.submissionId).subscribe(data => {
        this.xform = {name: data.form, content: data.content, loading: false}
        this.svc.getForm(this.xform.name).subscribe(xdata => {
          const content = JSON.parse(this.xform.content);
          this.eform = new EnketoForm(this.html(xdata.form), xdata.model, content);
          if(this.editable === 'false') {
            this.disableInputs();
          }
        });
      });
    } else if(this.formId) {
      this.svc.getForm(this.formId).subscribe(xdata => {
        this.eform = new EnketoForm(this.html(xdata.form), xdata.model, null);
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
      this.svc.addSubmission(this.formId, this.submissionId, data);
    } else if(this.submissionId && this.editable !== 'false') {
      this.svc.updateSubmission(this.formId, this.submissionId, data);
    }
  }
}
