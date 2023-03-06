import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { Bed } from '../../interfaces'
import { AnimationsService } from '../../Services/animations.service'
import { zoomIn } from 'ng-animate';
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { BottomSheetLeitosList } from './leitos-list-botton-sheet/leitos-list-botton-sheet'
import { HomeComponent } from '../../home/home.component';
import { FormBuilder, FormGroup, } from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-leitos-list',
  templateUrl: './leitos-list.component.html',
  styleUrls: ['./leitos-list.component.scss'],
})
export class LeitosListComponent implements OnInit {
  
  bed!: Bed;
  items: Observable<any[]> | undefined;
  private _selectedBed: string | undefined;
  zones: Observable<any[]>;

  private itemDoc!: AngularFirestoreDocument<Bed>;
  item!: Observable<any>;
  
  @ViewChild(NgScrollbar)
  scrollable!: NgScrollbar;
  selectedZone: string  | undefined;

  selectedValue = ''

  form: FormGroup = this.formBuilder.group({
    add_check:['']
  })

  constructor(
    private afs: AngularFirestore,
    private animationsService: AnimationsService,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private homeComponent: HomeComponent,
    private formBuilder: FormBuilder
    ) {
    this.route.queryParams.subscribe(params => {
      this.selectedZone = params['selectedZone'];
      this.items = afs.collection('/HTL/'+this.selectedZone+'/beds').valueChanges();
      this.homeComponent.title = this.selectedZone
    });
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
  }

  ngOnInit() {
    
  }
  

  selectBed(id: string, box: HTMLElement) {
    this.selectedBed = id;
    this.itemDoc = this.afs.doc<Bed>('/HTL/'+this.selectedZone+'/beds/'+id);
    this.item = this.itemDoc.valueChanges();
    this.animationsService.playAnim(box, zoomIn)
    this.homeComponent.title = this.selectedZone
  } 

  get selectedBed(): string | undefined {
    return this._selectedBed;
  }
  
  set selectedBed(id: string | undefined) {
    this._selectedBed = id;
    this.itemDoc = this.afs.doc<Bed>('/HTL/'+this.selectedZone+'/beds/'+id);
    this.item = this.itemDoc.valueChanges();
    
  }

  scroll_start(){
    this.scrollable.scrollTo({ start: 0 });
  }

  scroll_end() {
    this.scrollable.scrollTo({ end: 0 });
  } 

  openBottomSheet(source: string) {
    this._bottomSheet.open(BottomSheetLeitosList, {data: {source: source, zone: this.selectedZone, bed: this._selectedBed}});
  }

  delete_check(key:any){
    const keyToUpdate = [key] as [string];
    this.itemDoc.update({ [`check_list.${keyToUpdate}`]: firebase.firestore.FieldValue.delete() });
  }

  add_check(){
    let key = this.form.value.add_check
    const keyToUpdate = [key] as [string];
    this.itemDoc.update({ [`check_list.${keyToUpdate}`]: false });
  }

  check(item:any){
    let key = item.key
    let value = item.value
    const keyToUpdate = [key] as [string];
    if(value == true){
      this.itemDoc.update({ [`check_list.${keyToUpdate}`]: false });
    } else if (value == false){
      this.itemDoc.update({ [`check_list.${keyToUpdate}`]: true });
    }
  }

  async goal(key: any) {
    const bed = await firstValueFrom(this.itemDoc.get());
    if (bed?.data()?.goal?.[key] === true) {
      this.itemDoc.update({[`goal.${key}`]: false});
    } else if (bed?.data()?.goal?.[key] === false) {
      this.itemDoc.update({[`goal.${key}`]: true});
    }
  }

  destination(value: string){
    this.itemDoc.update({destination: value})
  }

  destination_selected() {
    this.itemDoc.get().subscribe(val=>{
      //this.selectedValue = val.data()?.destination
    })
  }
}