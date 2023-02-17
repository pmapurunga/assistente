import {Component, OnInit, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../Services/auth.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
 
  title: string  | undefined
  panelOpenState = true;
  zones: Observable<any[]>;
  
  constructor(
    private afs: AngularFirestore, 
    private router: Router,
    public authService: AuthService,
  ) {
    this.zones = this.afs.collection('/HTL/').valueChanges(); 
  }

  ngOnInit() {
    setTimeout(() => {
      this.title = ''
    }, 100);
  }

  link_home(){
    this.router.navigate(['/home'])
    this.sidenav.toggle()
  }

  link_adm(){
    this.router.navigate(['/home/adm-center'])
    this.sidenav.toggle()
  }

  selectZone(zone: string) {
    this.router.navigate(['/home/leitos-center/leitos-list'], { queryParams: { selectedZone: zone } });
          
    setTimeout(() => {
      this.title = zone;
    }, 100);
      
    this.sidenav.toggle()
  }
  logout(){
    return this.authService.SignOut()
  }

}