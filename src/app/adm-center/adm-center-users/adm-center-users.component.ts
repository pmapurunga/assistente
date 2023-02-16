import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AdmBottomSheet } from './adm-user-botton-sheet/adm-user-bottom-sheet.component'

@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-center-users.component.html',
  styleUrls: ['./adm-center-users.component.scss']
})
export class AdmUsersComponent {

  
  constructor(
    private _bottomSheet: MatBottomSheet,
    ) {
  }

  ngOnInit() {
    
  }

  openBottomSheet(): void {
    this._bottomSheet.open(AdmBottomSheet);
  }

}