import {Component, Inject} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

export interface BottomSheetData {
  source: string;
}

@Component({
    selector: 'leitos-list-bottom-sheet',
    templateUrl: 'leitos-list-botton-sheet.html',
  })
  export class BottomSheetLeitosList {
    constructor(
      private _bottomSheetRef: MatBottomSheetRef<BottomSheetLeitosList>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData,
      ) {

      }

      ngOnInit() {
        
      }
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }