import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit() { }

  register(){
    let email = this.form.value.email
    let password = this.form.value.password
    
    this.authService.SignUp(this.form.value)
  }
  

}