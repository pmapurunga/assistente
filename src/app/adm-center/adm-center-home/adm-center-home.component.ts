import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-adm-center-home',
  templateUrl: './adm-center-home.component.html',
  styleUrls: ['./adm-center-home.component.css']
})
export class AdmCenterHomeComponent {

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    setTimeout(() => {
      this.appComponent.title = 'Administração';
    }, 100);
  }

 }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/