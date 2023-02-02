import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LeitosCenterHomeComponent } from './leitos-center-home/leitos-center-home.component';
import { LeitosListComponent } from './leitos-list/leitos-list.component';
import { LeitosCenterComponent } from './leitos-center/leitos-center.component';
import { LeitosDetailComponent } from './leitos-detail/leitos-detail.component';

import { LeitosCenterRoutingModule } from './leitos-center-routing.module';
import { MaterialModule } from '../material.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeitosCenterRoutingModule,
    MaterialModule
  ],
  declarations: [
    LeitosCenterComponent,
    LeitosListComponent,
    LeitosCenterHomeComponent,
    LeitosDetailComponent,
  ]
})
export class LeitosCenterModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/