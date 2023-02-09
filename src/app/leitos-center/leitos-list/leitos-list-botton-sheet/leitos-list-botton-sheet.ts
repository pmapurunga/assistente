import {Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { Bed, BottomSheetData } from '../../../interfaces'
import { Observable } from 'rxjs';
@Component({
    selector: 'leitos-list-bottom-sheet',
    templateUrl: 'leitos-list-botton-sheet.html',
  })

  export class BottomSheetLeitosList {

    private itemsCollection: AngularFirestoreCollection<Bed>;
    items: Observable<Bed[]>;
    sourceList = ['client_name', 'birthday', 'problems_list'];

    form: FormGroup = this.formBuilder.group({
      id: [''],
      bed_name: [''],
      client_name: [''],
      birthday: [Date],
      start_emergency: [''],
      start_internment: [''],
      service_number: [''],
      plan_number: [''],
      problems_list: [''],
      conduct: [''],
      check_list: [''],
      doctor: [''],
      nurse: [''],
      state: ['']
    });

    constructor(
      private _bottomSheetRef: MatBottomSheetRef<BottomSheetLeitosList>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData,
      private formBuilder: FormBuilder,
      private afs: AngularFirestore,
      ) {
        this.itemsCollection = afs.collection<Bed>('HTL/'+data.zone+'/beds/');
        this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
        
      }

      ngOnInit() {
        
      }

      submitAdd() {
        this.itemsCollection.doc(this.data.bed).update({
          client_name: this.form.value.client_name,
          birthday: this.form.value.birthday,
          state: this.form.value.state,
          plan_number: this.form.value.plan_number
        });
        this._bottomSheetRef.dismiss();
      }
      
      

    submitName(){
      
    }

    submitBirthdate(){

    }

    submitProblems(){
      this.itemsCollection.doc(this.data.bed).update({
        problems_list: JSON.stringify(this.form.value.problems_list)
      });
      this._bottomSheetRef.dismiss();
    }    
    
    alta(){
      this.itemsCollection.doc(this.data.bed).update({
        client_name: "",
        birthday: "",
        start_emergency: "",
        start_internment:"",
        service_number: "",
        plan_number: "",
        problems_list: "",
        conduct: "",
        check_list: [""],
        doctor: "",
        nurse: "",
        state: "",
      });
      this._bottomSheetRef.dismiss();
    }
            
  }