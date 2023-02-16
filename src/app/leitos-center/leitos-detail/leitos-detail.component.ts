import { Component, OnInit, HostBinding } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leitos-detail',
  templateUrl: './leitos-detail.component.html',
  styleUrls: ['./leitos-detail.component.css'],
})
export class LeitosDetailComponent implements OnInit {
  
  constructor(
  ) {
    
  }

  ngOnInit() {
  
  }

}