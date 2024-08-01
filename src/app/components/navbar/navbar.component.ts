import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  userId :any ;
  constructor(private userService : UserService,private router : Router) {}
  ngOnInit() {
    this.getId()
  }
  getId(){
    if(this.userService.getUserId()!=null){
      this.userId = this.userService.getUserId();
      console.log(this.userId)
    }
    return this.userId;
  }
  logout() {
    this.userService.logout();
    this.userId = null;
    this.router.navigateByUrl("/");
  }

}
