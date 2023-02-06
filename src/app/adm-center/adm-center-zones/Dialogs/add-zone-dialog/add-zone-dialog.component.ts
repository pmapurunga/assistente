import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Zone, Bed } from '../../../../interfaces'

@Component({
    selector: 'add-zone-dialog',
    templateUrl: 'add-zone-dialog.html',
  })
  export class AddZoneDialog {
    private itemsCollection: AngularFirestoreCollection<Zone>;
    items: Observable<Zone[]>;
    
    form: FormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      beds: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    constructor(
      public dialogRef: MatDialogRef<AddZoneDialog>,
      private formBuilder: FormBuilder,
      private readonly afs: AngularFirestore
      ) {
        this.itemsCollection = afs.collection<Zone>('HTL');
        this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
      }

      submitForm() {
        var z_name = this.form.value.name;
        var n_beds = this.form.value.beds
        
        const zone: Zone = { name: z_name };
        this.itemsCollection.doc(z_name).set(zone);

        for (let i = 1; i <= n_beds; i++) {
          var bed: Bed = {
            id: i.toString(), bed_name: `Leito ${i}`,
            client_name: '',
            birthday: '',
            start_emergency: '',
            start_internment: '',
            service_number: '',
            plan_number: '',
            problems_list: '',
            conduct: '',
            check_list: [],
            doctor: '',
            nurse: ''
          }
          this.itemsCollection.doc(z_name).collection('beds').doc(i.toString()).set(bed);
        }
      }
      
    
  } 
  