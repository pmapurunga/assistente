import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from "../Services/auth.service";
import { User } from '../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  private itemDoc!: AngularFirestoreDocument<User>;
  item!: Observable<any>;
  uid: string | undefined;
  
  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.itemDoc = this.afs.doc<User>(`users/${this.uid}`);
        this.item = this.itemDoc.valueChanges();
      }
    });
  }

  ngOnInit(): void {
  }

  getUser() {
    console.log('uid:', this.uid)
  }

}
