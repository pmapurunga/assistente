import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  title: string  | undefined

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.title = 'Assistente Médico'
    }, 100);
  }


  link_home(){
    this.router.navigate(['/home'])
    this.sidenav.toggle()
  }

  link_leitos(){
    this.router.navigate(['/leitos-center'])
    this.sidenav.toggle()
  }

  link_adm(){
    this.router.navigate(['/adm-center'])
    this.sidenav.toggle()
  }

}
