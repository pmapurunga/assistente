import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { Leito } from '../leito';
import { AnimationsService } from '../../Services/animations.service'
import { zoomIn } from 'ng-animate';
import { AppComponent } from '../../app.component';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet'
import { BottomSheetLeitosList } from './leitos-list-botton-sheet/leitos-list-botton-sheet'

@Component({
  selector: 'app-leitos-list',
  templateUrl: './leitos-list.component.html',
  styleUrls: ['./leitos-list.component.scss'],
})
export class LeitosListComponent implements OnInit {
  
  leito!: Leito;
  items: Observable<any[]>;
  private _selectedBed: string | undefined;

  private itemDoc!: AngularFirestoreDocument<Leito>;
  item!: Observable<any>;
  
  @ViewChild(NgScrollbar)
  scrollable!: NgScrollbar;
  selectedZone: string | null;

  constructor(
    private afs: AngularFirestore,
    private animationsService: AnimationsService,
    private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
  ) {
    this.selectedZone = this.route.snapshot.queryParamMap.get('selectedZone');
    this.items = afs.collection('/HTL/'+this.selectedZone+'/beds').valueChanges(); 
  }

  ngOnInit() {
    
  }

  selectBed(id: string, box: HTMLElement) {
    this.selectedBed = id;
    this.itemDoc = this.afs.doc<Leito>('/HTL/'+this.selectedZone+'/beds/' + id);
    this.item = this.itemDoc.valueChanges();
    this.animationsService.playAnim(box, zoomIn)
  } 

  get selectedBed(): string | undefined {
    return this._selectedBed;
  }
  
  set selectedBed(value: string | undefined) {
    this._selectedBed = value;
    this.itemDoc = this.afs.doc<Leito>('/HTL/Posto 2/beds/'+value);
    this.item = this.itemDoc.valueChanges();
  }

  scroll_start(){
    this.scrollable.scrollTo({ start: 0 });
  }

  scroll_end() {
    this.scrollable.scrollTo({ end: 0 });
  } 

  openBottomSheet(source: string): void {
    this._bottomSheet.open(BottomSheetLeitosList, {data: {source: source}});
  }

}