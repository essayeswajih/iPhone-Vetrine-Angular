import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup ;

  constructor(private fb: FormBuilder,private userService:UserService,private router : Router) {
    this.registerForm = this.fb.group({
      nomCl: ['', Validators.required],
      prenomCl: ['', Validators.required],
      emailCl: ['', [Validators.required, Validators.email]],
      passwordCl: ['', [Validators.required, Validators.minLength(6)]],
      adresseCl: ['', Validators.required],
      telCl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
   }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.userService.registerUser(this.registerForm.value).then(
        (res) => {
          if(res.status == 200){
            console.log(res);
            this.router.navigateByUrl("/login");
          }
        }
      )

    } else {
      console.log('Form is not valid');
    }
  }

}
