import { Component,  EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';

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
    private homeComponent: HomeComponent,
    ) {
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.homeComponent.title = 'Escolha a Área do Hospital';
    }, 100);
  }

  selectZone(zone: string) {
    this.router.navigate(['/leitos-list'], { queryParams: { selectedZone: zone } });
    setTimeout(() => {
      this.homeComponent.title = zone;
    }, 100);
  }

 }
