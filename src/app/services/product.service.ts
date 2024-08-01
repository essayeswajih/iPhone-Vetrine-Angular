import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:9090/Articles';

  constructor() { }

  getAllProducts() {
    return axios.get(this.apiUrl);
  }

  getProductById(id: number) {
    return axios.get(`${this.apiUrl}/${id}`);
  }

  createProduct(productData: any){
    console.log(productData)
    return axios.post(`${this.apiUrl}/save`, productData);
  }

  updateProduct(id: number, productData: any){
    return axios.put(`${this.apiUrl}`, productData);
  }

  deleteProduct(id: number) {
    return axios.delete(`${this.apiUrl}/delete/${id}`);
  }
}
