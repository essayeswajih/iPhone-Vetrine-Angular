import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  registerForm: FormGroup ;
  message: any;
  constructor(private fb: FormBuilder,private user: UserService,private router:Router) {
    this.registerForm = this.fb.group({
      emailCl: ['', [Validators.required, Validators.email]],
      passwordCl: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if(this.registerForm.valid){
      try{
        this.user.login(this.registerForm.value).then(
          (data) => this.router.navigateByUrl("/")
        );
      }
      catch(e){
        this.message = e;
      }
    }
    else{
      this.message = "Not Valid fields";
    }


  }
}
