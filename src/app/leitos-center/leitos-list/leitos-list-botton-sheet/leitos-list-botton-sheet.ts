import {Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Bed, BottomSheetData } from '../../../interfaces'
import { Observable } from 'rxjs';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/pt';
import * as moment from 'moment';

@Component({
    selector: 'leitos-list-bottom-sheet',
    templateUrl: 'leitos-list-botton-sheet.html',
    providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
      },
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    ]
  })

  export class BottomSheetLeitosList {

    private itemsCollection: AngularFirestoreCollection<Bed>;
    items: Observable<Bed[]>;
    private itemDoc!: AngularFirestoreDocument<Bed>;
    item!: Observable<any>;
    sourceList = ['client_name', 'birthday', 'problems_list', 'conduct', 'state', 'notes'];

    form: FormGroup = this.formBuilder.group({
      id: [''],
      bed_name: [''],
      client_name: [''],
      birthday: [null, Validators.required],
      start_emergency: [''],
      start_internment: [''],
      service_number: [''],
      plan_number: [''],
      problems_list: [''],
      conduct: [''],
      check_list: [''],
      doctor: [''],
      nurse: [''],
      state: [''],
      notes: ['']
    });

    constructor(
      private _bottomSheetRef: MatBottomSheetRef<BottomSheetLeitosList>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData,
      private formBuilder: FormBuilder,
      private afs: AngularFirestore,
      ) {

        this.itemsCollection = afs.collection<Bed>('HTL/'+data.zone+'/beds/');
        this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
        
        this.itemDoc = this.afs.doc<Bed>('HTL/'+data.zone+'/beds/'+data.bed);
        this.item = this.itemDoc.valueChanges();
        
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
      
      

    submitName(value:any){
      if(value === !this.form.value.problems_list){
        this.itemsCollection.doc(this.data.bed).update({
          client_name: this.form.value.client_name
        });
        } else if(value === this.form.value.client_name){
          this.itemsCollection.doc(this.data.bed).update({
            client_name: value
          });
        }
        this._bottomSheetRef.dismiss();
    }

    submitBirthday(value: any) {
      const birthdayDate = moment(this.form.value.birthday).toDate(); 
      this.itemsCollection.doc(this.data.bed).update({
        birthday: birthdayDate 
      });
      this._bottomSheetRef.dismiss();
    }

    isBirthdayInvalid() {
      const birthdayControl = this.form.get('birthday');
      return !!birthdayControl && birthdayControl.invalid && (birthdayControl.dirty || birthdayControl.touched);
    }
    
    
    submitProblems(value:any){
      if(value === !this.form.value.problems_list){
      this.itemsCollection.doc(this.data.bed).update({
        problems_list: JSON.stringify(this.form.value.problems_list).replace(/\"/g, '')
      });
      } else if(value === this.form.value.problems_list){
        this.itemsCollection.doc(this.data.bed).update({
          problems_list: JSON.stringify(value).replace(/\"/g, '')
        });
      }
      this._bottomSheetRef.dismiss();
    }    

    submitConduct(value:any){
      if(value === !this.form.value.conduct){
        this.itemsCollection.doc(this.data.bed).update({
          conduct: JSON.stringify(this.form.value.conduct).replace(/\"/g, '')
        });
        } else if(value === this.form.value.conduct){
          this.itemsCollection.doc(this.data.bed).update({
            conduct: JSON.stringify(value).replace(/\"/g, '')
          });
        }
        this._bottomSheetRef.dismiss();
    }

    submitNotes(value:any){
      if(value === !this.form.value.notes){
        this.itemsCollection.doc(this.data.bed).update({
          notes: JSON.stringify(this.form.value.notes).replace(/\"/g, '')
        });
        } else if(value === this.form.value.notes){
          this.itemsCollection.doc(this.data.bed).update({
            notes: JSON.stringify(value).replace(/\"/g, '')
          });
        }
        this._bottomSheetRef.dismiss();
    }

    submitState(){
      this.itemDoc.update({state: this.form.value.state});
      this._bottomSheetRef.dismiss();
    }
    
    alta(){
      this.itemsCollection.doc(this.data.bed).update({
        client_name: "",
        birthday: new Date(0),
        start_emergency: "",
        start_internment:"",
        service_number: "",
        plan_number: "",
        problems_list: "",
        conduct: "",
        check_list: Object.fromEntries(new Map<string, boolean>()),
        doctor: "",
        nurse: "",
        state: "",
        notes: '',
        goal: {evolved: false, prescribed: false, tested: false}
      });
      this._bottomSheetRef.dismiss();
    }
            
  }