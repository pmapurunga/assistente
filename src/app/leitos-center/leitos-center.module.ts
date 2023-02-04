import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LeitosCenterRoutingModule } from './leitos-center-routing.module';
import { MaterialModule } from '../material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { LeitosCenterHomeComponent } from './leitos-center-home/leitos-center-home.component';
import { LeitosListComponent } from './leitos-list/leitos-list.component';
import { LeitosCenterComponent } from './leitos-center/leitos-center.component';
import { LeitosDetailComponent } from './leitos-detail/leitos-detail.component';
import { BottomSheetLeitosList } from './leitos-list/leitos-list-botton-sheet/leitos-list-botton-sheet'

import { AnimationsService } from '../Services/animations.service'

import { OrderByPipe } from '../Pipes/orde-by.pipe'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeitosCenterRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    ScrollingModule,
  ],
  exports:[
    LeitosCenterHomeComponent,
    LeitosCenterComponent,
    LeitosListComponent,
    LeitosCenterHomeComponent,
    LeitosDetailComponent,
    BottomSheetLeitosList,
  ],
  declarations: [
    LeitosCenterComponent,
    LeitosListComponent,
    LeitosCenterHomeComponent,
    LeitosDetailComponent,
    OrderByPipe,
    BottomSheetLeitosList
  ],
  providers: [AnimationsService],
})
export class LeitosCenterModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/