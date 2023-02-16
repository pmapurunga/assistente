import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'leitos-list',
        component: LeitosListComponent,
        data: { preload: true },
        children: [
          {
            path: ':id',
            component: LeitosListComponent,
            data: { preload: true },
          },
        ]
      },
      {
        path: 'leitos-home',
        component: LeitosCenterHomeComponent
      },
      {
        path: '',
        component: LeitosCenterHomeComponent
      }
    ]
  },
  { path: "", redirectTo: "", pathMatch: "full" }
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