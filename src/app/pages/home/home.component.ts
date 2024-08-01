import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/commande.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  name:any = 444;
  ArticleList : any;
  API_URL = "product";
  constructor(
    private productservice:ProductService,
    private router : Router,
    private cartService: CartService) {}
  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await this.productservice.getAllProducts();
      this.ArticleList = response.data.Result;
      console.log(this.ArticleList);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }
  open(id: any) {
    this.router.navigateByUrl(`${this.API_URL}/${id}`)
  }
  buy(id:any) {
    this.cartService.addToCart(id).then(
      (res) => {
        if(res.status==200){
          alert("Phone Adedd To Card")
        }
      }
    );
  }
}
