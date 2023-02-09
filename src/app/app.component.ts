import { Component, ViewChild, } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
 
  title: string  | undefined
  panelOpenState = true;
  zones: Observable<any[]>;
  
  constructor(
    private afs: AngularFirestore, 
    private router: Router,
  ) {
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
  }

  ngOnInit() {
    setTimeout(() => {
      this.title = 'Assistente Médico'
    }, 100);
  }


  link_home(){
    this.router.navigate(['/home'])
    this.sidenav.toggle()
  }

  link_adm(){
    this.router.navigate(['/adm-center'])
    this.sidenav.toggle()
  }

  selectZone(zone: string) {
    this.router.navigate(['/leitos-list/'], { queryParams: { selectedZone: zone } });
      
    setTimeout(() => {
      this.title = zone;
    }, 100);
      
    this.sidenav.toggle()
  }

}
