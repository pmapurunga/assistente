import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmCenterComponent } from './adm-center/adm-center.component'
import { AdmCenterHomeComponent } from './adm-center-home/adm-center-home.component';
import { AdmCenterZonesComponent } from './adm-center-zones/adm-center-zones.component';



const AdmCenterRoutes: Routes = [
  
  {
    path: '',
    component: AdmCenterComponent,
   children: [
      {
        path: '',
        component: AdmCenterHomeComponent,
      },
      {
        path: 'adm-zones',
        component: AdmCenterZonesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AdmCenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdmCenterRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/