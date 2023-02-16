import {Component} from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'adm-user-bottom-sheet.component',
    templateUrl: 'adm-user-bottom-sheet.component.html',
  })
  export class AdmBottomSheet {

    form: FormGroup = this.formBuilder.group({
      name: [''],
      crm: [''],
      coren: [''],
      phone: [''],
      hospital: [''],
      class: [''],
    });

    constructor(
      private _bottomSheetRef: MatBottomSheetRef<AdmBottomSheet>,
      private formBuilder: FormBuilder,
      ) {}
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }

    submitUser(){
      
    }

  }