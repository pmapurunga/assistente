import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit() { }

  sign_in(){
    let email = this.form.value.email;
    let password = this.form.value.password;
    this.authService.SignIn(email, password)
  }
}