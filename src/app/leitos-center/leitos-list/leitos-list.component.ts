import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Leito } from '../leito';

@Component({
  selector: 'app-leitos-list',
  templateUrl: './leitos-list.component.html',
  styleUrls: ['./leitos-list.component.css'],
  
})
export class LeitosListComponent implements OnInit {
  
  leito!: Leito;
  items: Observable<any[]>;
  
  constructor(
    firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.items = firestore.collection('/HTL/clients/Posto 2/').valueChanges(); 
  }

  ngOnInit() {
    
  }

  gobed(id:string){
    this.redirectTo(id)
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/leitos-center/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]))
  
}
}