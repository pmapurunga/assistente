import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmCenterComponent } from './adm-center/adm-center.component'
import { AdmCenterHomeComponent } from './adm-center-home/adm-center-home.component';
import { AdmCenterZonesComponent } from './adm-center-zones/adm-center-zones.component';
import { AdmUsersComponent } from './adm-center-users/adm-center-users.component'


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
      },
      {
        path: 'adm-users',
        component: AdmUsersComponent,
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