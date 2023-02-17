import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../Services/auth.service";
import { EstadosService } from '../../Services/estados.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  estados: any;
  progress = false;
  form: FormGroup = this.formBuilder.group({
    displayName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    type_class: ['', [Validators.required]],
    number_class: ['', [Validators.required]],
    state_class: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private estadosService: EstadosService,
  ) { }
  
  ngOnInit() {
    this.estados = this.estadosService.getEstados();
   }

   register(){
    this.progress = true; // define a variável progress como true
    this.authService.SignUp(this.form.value)
      .then(() => {
        this.progress = false; // define a variável progress como false quando a função SignUp() é executada com sucesso
      })
      .catch(() => {
        this.progress = false; // define a variável progress como false quando ocorre um erro ao executar a função SignUp()
      });
  }
  
  

}