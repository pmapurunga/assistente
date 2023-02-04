import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddZoneDialog } from './Dialogs/add-zone-dialog/add-zone-dialog.component'
import { AppComponent } from '../../app.component';

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
    private appComponent: AppComponent,
    ) {
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
    
  }

  ngOnInit() {
    this.appComponent.title = 'Áreas do Hospital';
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

  plus_bed(){
    
  }

}

