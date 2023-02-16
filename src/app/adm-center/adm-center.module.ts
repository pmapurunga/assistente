import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AdmCenterRoutingModule } from './adm-center-routing.module'

import { AdmCenterComponent } from './adm-center/adm-center.component'
import { AdmCenterHomeComponent } from './adm-center-home/adm-center-home.component';
import { AdmCenterZonesComponent } from './adm-center-zones/adm-center-zones.component';
import { AddZoneDialog } from './adm-center-zones/Dialogs/add-zone-dialog/add-zone-dialog.component';
import { AdmUsersComponent } from './adm-center-users/adm-center-users.component'
import { AdmBottomSheet } from './adm-center-users/adm-user-botton-sheet/adm-user-bottom-sheet.component'

@NgModule({
  declarations: [
    AdmCenterComponent,
    AdmCenterHomeComponent,
    AdmCenterZonesComponent,
    AddZoneDialog,
    AdmUsersComponent,
    AdmBottomSheet,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MaterialModule,
    AdmCenterRoutingModule,
  ]
})
export class AdmCenterModule { }
