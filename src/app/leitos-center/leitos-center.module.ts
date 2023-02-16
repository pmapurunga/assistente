import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AgePipe } from '../Pipes/age.pipe'
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { TextPipe } from '../Pipes/text.pipe'

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeitosCenterRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatNativeDateModule,
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
    BottomSheetLeitosList,
    AgePipe,
    TextPipe,
  ],
  providers: [
    AnimationsService, 
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class LeitosCenterModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/