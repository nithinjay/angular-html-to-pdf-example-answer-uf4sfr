import { jsPDF } from 'jspdf';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular Html To Pdf ';
  serviceDescriptionData: Array<any> = [
    { name: 'Council Report', value: '1' },
    { name: 'Cost Plan Report', value: '2' },
    { name: 'Budget Estimation', value: '3' },
    { name: 'Expert Report', value: '4' },
    { name: 'Initial Report', value: '5' },
    { name: 'Monthly Progress Claim', value: '6' },
    { name: 'Other Service, please specify', value: '7' }
  ];
  isMasterSel: boolean;
  ckeConfig!: CKEDITOR.config;
  termsCondition: string;
  aboutCC: string;
  acceptanceByPrincipal: string;
  serviceDescription: string;
  councilReport: string;
  costPlanReport: string;
  budgetEstimation: string;
  expertReport: string;
  initialReport: string;
  monthlyProgressClaim: string;
  otherSpecify: string;
  log: string = '';
  editor: any;
  checkedserviceDescriptionData: any;
  @ViewChild('tcCkEditor', { static: false }) tcCkEditor: CKEditorComponent;
  @ViewChild('pCkEditor', { static: false }) pCkEditor: CKEditorComponent;
  @ViewChild('abpCkEditor', { static: false }) abpCkEditor: CKEditorComponent;
  @ViewChild('sdCkEditor', { static: false }) sdCkEditor: CKEditorComponent;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  @ViewChild('content', { static: false }) content!: ElementRef;
  downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }
  onChange($event: any): void {
    console.log('onChange', $event);
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log('onPaste');
    //this.log += new Date() + "<br />";
  }

  onServiceDescriptionChange($event: any) {
    this.getCheckedItemList();
  }

  checkUncheckAll() {
    for (var i = 0; i < this.serviceDescriptionData.length; i++) {
      this.serviceDescriptionData[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.serviceDescriptionData.every(function(item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedserviceDescriptionData = [];
    this.serviceDescription = '';
    for (var i = 0; i < this.serviceDescriptionData.length; i++) {
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 1
      ) {
        this.serviceDescription += this.councilReport;
      } else {
        this.serviceDescription += '';
      }
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 2
      ) {
        this.serviceDescription += this.costPlanReport;
      } else {
        this.serviceDescription += '';
      }
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 3
      ) {
        this.serviceDescription += this.budgetEstimation;
      } else {
        this.serviceDescription += '';
      }
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 4
      ) {
        this.serviceDescription += this.expertReport;
      } else {
        this.serviceDescription += '';
      }
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 5
      ) {
        this.serviceDescription += this.initialReport;
      } else {
        this.serviceDescription += '';
      }
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 6
      ) {
        this.serviceDescription += this.monthlyProgressClaim;
      } else {
        this.serviceDescription += '';
      }
      if (
        this.serviceDescriptionData[i].isSelected &&
        this.serviceDescriptionData[i].value == 7
      ) {
        this.serviceDescription += this.otherSpecify;
      } else {
        this.serviceDescription += '';
      }
    }
  }
}
