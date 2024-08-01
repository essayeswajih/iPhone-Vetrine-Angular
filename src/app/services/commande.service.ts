import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  remouveAllFromCart() {
    let data = {
      idClient:7
    };
    return axios.delete(`${this.apiUrl}/deleteAllProduct`,{data: data});
  }

  private apiUrl = 'http://localhost:9090/Commands';

  constructor(private userService:UserService) { }

  addToCart(productId: number) {
    if(this.userService.getUserId()==null){
      throw new Error;
    }
    let data={
      idClient:this.userService.getUserId(),
      idArticle:productId
    };
    return axios.post(this.apiUrl+"/addPTC", data);
  }

  removeFromCart(productId: number){
    if(this.userService.getUserId()==null){
      throw new Error;
    }
    let data:any = {
      idClient:this.userService.getUserId(),
      idArticle:productId
    };
    return axios.delete(`${this.apiUrl}/deleteFC`,{data: data});
  }

  getProductsFromCart() {
    if(this.userService.getUserId()==null){
      throw new Error;
    }
    let clientId = this.userService.getUserId();
    return axios.get(this.apiUrl+"/user/"+clientId);
  }

  getTotalPrice() {
    return axios.get<number>(`${this.apiUrl}/total-price`);
  }

  clearCart() {
    return axios.delete(this.apiUrl);
  }
}