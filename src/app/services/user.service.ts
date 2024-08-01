import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:9090/Client'; // Change this to your actual API endpoint

  constructor() { }

  registerUser(user: any) {
    return axios.post(`${this.apiUrl}/save`, user);
  }
  async login(data:any){
    const res = await axios.post(`${this.apiUrl}/login`, data);
    localStorage.setItem("id",res.data.Client.id);
    return res.data.Client;
  }
  logout(){
    localStorage.removeItem("id");
  }
  getUserId(){
    return localStorage.getItem("id");
  }
}