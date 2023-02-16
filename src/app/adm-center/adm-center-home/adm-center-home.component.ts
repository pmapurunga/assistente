import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-adm-center-home',
  templateUrl: './adm-center-home.component.html',
  styleUrls: ['./adm-center-home.component.css']
})
export class AdmCenterHomeComponent {

  constructor(private homeComponent: HomeComponent) {}

  ngOnInit() {
    setTimeout(() => {
      this.homeComponent.title = 'Administração';
    }, 100);
  }

 }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/