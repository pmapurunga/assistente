import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { slideInAnimation } from '../slideInAnimation';

import { LeitosCenterHomeComponent } from './leitos-center-home/leitos-center-home.component';
import { LeitosListComponent } from './leitos-list/leitos-list.component';
import { LeitosCenterComponent } from './leitos-center/leitos-center.component';
import { LeitosDetailComponent } from './leitos-detail/leitos-detail.component';


const leitosCenterRoutes: Routes = [
  {
    path: '',
    component: LeitosCenterComponent,
    children: [
      {
        path: '',
        component: LeitosListComponent,
        children: [
          {
            path: ':id',
            component: LeitosDetailComponent,
            data: { preload: true, animation: ':id' },
          },
          {
            path: '',
            component: LeitosCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(leitosCenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LeitosCenterRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/