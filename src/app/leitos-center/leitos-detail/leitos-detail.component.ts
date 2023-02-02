import { Component, OnInit, HostBinding } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Leito } from '../leito';
//import { slideInAnimation } from '../../slideInAnimation';

@Component({
  selector: 'app-leitos-detail',
  templateUrl: './leitos-detail.component.html',
  styleUrls: ['./leitos-detail.component.css'],
  //animations: [slideInAnimation]
})
export class LeitosDetailComponent implements OnInit {
  //@HostBinding('@routeAnimation') routeAnimation = true;
  leito!: Leito | undefined;
  editName = '';
  private itemDoc: AngularFirestoreDocument<Leito> | undefined;
  item: Observable<any> | undefined;
  id: number | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
  ) {
    
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.itemDoc = this.afs.doc<Leito>('/HTL/clients/Posto 2/'+this.id);
    this.item = this.itemDoc.valueChanges();
    console.log(this.id)
  }

}