import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  //Get UserData
  
  

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/home/dashboard']);
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';
        if (errorCode === 'auth/user-not-found') {
          errorMessage = 'Não encontramos nenhum usuário com esse e-mail';
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Senha incorreta';
        } else {
          errorMessage = 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.';
        }
        this._snackBar.open(errorMessage, 'ok');
      });
  }
  
  // Sign up with email/password
  SignUp(value:any) {
    return this.afAuth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetData(result.user, value);
      })
      .catch((error) => {
        let errorMessage: string;
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'O endereço de e-mail já está sendo usado por outra conta';
            break;
          case 'auth/invalid-email':
            errorMessage = 'O endereço de e-mail é inválido';
            break;
          case 'auth/weak-password':
            errorMessage = 'A senha é muito fraca';
            break;
          default:
            errorMessage = 'Ocorreu um erro ao criar a conta';
        }
        this._snackBar.open(errorMessage, 'ok');
      });
  }
  
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/auth/verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this._snackBar.open('Um e-mail para reiniciar sua senha foi enviado, verifique sua caixa de entrada.', 'Ok');
      })
      .catch((error) => {
        let errorMessage: string;
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'O endereço de e-mail informado não corresponde a nenhuma conta.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'O endereço de e-mail é inválido';
            break;
          default:
            errorMessage = 'Ocorreu um erro ao enviar o e-mail de reinicialização de senha.';
        }
        this._snackBar.open(errorMessage, 'ok');
      });
  }
  
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  SetData(user: any, value:any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: value.displayName,
      emailVerified: user.emailVerified,
      type_class: value.type_class,
      number_class: value.number_class,
      state_class: value.state_class,
      hospital: 'HTL',
      phone: value.phone,
      type_user: 'general'
    };
    return userRef.set(userData);
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/sign-in']);
    });
  }
}