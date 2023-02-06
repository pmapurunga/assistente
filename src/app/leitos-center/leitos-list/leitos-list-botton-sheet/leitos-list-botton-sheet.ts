import {Component, Inject} from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bed, BottomSheetData } from '../../../interfaces'
import { Observable } from 'rxjs';

@Component({
    selector: 'leitos-list-bottom-sheet',
    templateUrl: 'leitos-list-botton-sheet.html',
  })

  export class BottomSheetLeitosList {

    private itemsCollection: AngularFirestoreCollection<Bed>;
    items: Observable<Bed[]>;
    
    form: FormGroup = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3)]],
      bed_name: ['', [Validators.required, Validators.minLength(3)]],
      client_name: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required, Validators.minLength(3)]],
      start_emergency: [''],
      start_internment: [''],
      service_number: ['', [Validators.required, Validators.minLength(3)]],
      plan_number: ['', [Validators.required, Validators.minLength(3)]],
      problems_list: ['', [Validators.required, Validators.minLength(3)]],
      conduct: ['', [Validators.required, Validators.minLength(3)]],
      check_list: ['', [Validators.required, Validators.minLength(3)]],
      doctor: ['', [Validators.required, Validators.minLength(3)]],
      nurse: ['', [Validators.required, Validators.minLength(3)]],
    });

    constructor(
      private _bottomSheetRef: MatBottomSheetRef<BottomSheetLeitosList>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData,
      private formBuilder: FormBuilder,
      private readonly afs: AngularFirestore
      ) {
        this.itemsCollection = afs.collection<Bed>('HTL/'+data.zone+'/beds/');
        this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
      }

      ngOnInit() {
        
      }
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }

    submitForm() {

      const bed: Bed = { 
        ...this.form.value
      };

      this.itemsCollection.doc(bed.id).update({
        client_name: bed.client_name,
        birthday: bed.birthday, 
        start_emergency: bed.start_emergency,
        start_internment: bed.start_internment,
        service_number: bed.service_number,
        plan_number: bed.plan_number,
      });
      

    }

  }