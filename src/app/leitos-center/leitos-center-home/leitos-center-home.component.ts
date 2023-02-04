import { Component,  EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-leitos-center-home',
  templateUrl: './leitos-center-home.component.html',
  styleUrls: ['./leitos-center-home.component.css']
})
export class LeitosCenterHomeComponent {
  zones: Observable<any[]>;

  constructor(
    private afs: AngularFirestore, 
    private router: Router,
    private appComponent: AppComponent
    ) {
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.appComponent.title = 'Escolha a Área do Hospital';
    }, 100);
  }

  selectZone(zone: string) {
    this.router.navigate(['/leitos-list'], { queryParams: { selectedZone: zone } });
    setTimeout(() => {
      this.appComponent.title = zone;
    }, 100);
  }

 }
