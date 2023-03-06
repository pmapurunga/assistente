import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddZoneDialog } from './Dialogs/add-zone-dialog/add-zone-dialog.component'
import { HomeComponent } from '../../home/home.component';
import { Bed } from 'src/app/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-center-zones',
  templateUrl: './adm-center-zones.component.html',
  styleUrls: ['./adm-center-zones.component.css']
})
export class AdmCenterZonesComponent {

  zones: Observable<any[]>;
  private _selectedZone: string | undefined;
  beds: Observable<any[]> | undefined;

  constructor(
    private afs: AngularFirestore, 
    public dialog: MatDialog,
    private homeComponent: HomeComponent,
    private _snackBar: MatSnackBar,
    ) {
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
    
  }

  ngOnInit() {
    this.homeComponent.title = 'Áreas do Hospital';
  }

  selectZone(zone: string){
    this.selectedZone = zone;
  }

  get selectedZone(): string | undefined {
    return this._selectedZone;
  }
  
  set selectedZone(value: string | undefined) {
    this._selectedZone = value;
    this.beds = this.afs.collection('/HTL/'+value+'/beds/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        //return { id, ...data };
      }))
    );
  }
  add_Dialog(): void {
    this.dialog.open(AddZoneDialog, {
      width: '350px',
    });
  }

  deleteZone(n_beds: number) {
    const value = this._selectedZone;
    let allBedsEmpty = true;
  
    for (let i = 1; i <= n_beds; i++) {
      this.afs.doc<Bed>('/HTL/' + value + '/beds/' + i).get().subscribe(bed => {
        if (bed.data()?.client_name !== '') {
          allBedsEmpty = false;
          this._snackBar.open('Tem que Leito está ocupado, primeiro dê alta a todos paciente', 'Ok');
          return;
        }
        if (i === n_beds) {
          if (allBedsEmpty) {
            this.afs.doc('/HTL/' + value).delete();
            this._snackBar.open('A área "' + value + '" foi apagada', 'Ok');
            this.selectedZone = undefined;
          }
        }
      });
    }
  }
  
  plus_bed(n_beds: any){
    const value = this._selectedZone
    var id = (n_beds+1).toString()
    var bed: Bed = {
      id: id, 
      bed_name: `Leito ${id}`,
      client_name: '',
      birthday: new Date(0),
      start_emergency: '',
      start_internment: '',
      service_number: '',
      plan_number: '',
      problems_list: '',
      conduct: '',
      check_list: Object.fromEntries(new Map<string, boolean>()),
      doctor: '',
      nurse: '',
      state: '',
      notes: '',
      goal: {evolved: false, prescribed: false, tested: false},
      destination: '',
      specialty:'',
    }
    this.afs.doc<Bed>('/HTL/' + value + '/beds/'+(n_beds+1)).set(bed)
  }

  less_bed(n_beds: any){
    const value = this._selectedZone
    this.afs.doc<Bed>('/HTL/' + value + '/beds/' + n_beds).get().subscribe(bed => {
      if (bed.data()?.client_name === '') {
        this.afs.doc('/HTL/' + value + '/beds/' + n_beds).delete();
      } else{
        this._snackBar.open('O Leito está ocupado, primeiro dê alta do paciente', 'Ok');
      }
    });
    
  }

}

