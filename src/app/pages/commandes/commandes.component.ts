import { Router } from '@angular/router';
import { Product } from './../../interfaces/product';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/commande.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss'
})
export class CommandesComponent {

  Total = 0;
  commmands:any;
  constructor(private cartService :CartService,private productService: ProductService,private router : Router ) { }
  
  ngOnInit(){
    this.cartService.getProductsFromCart().then(
      (data) => {
        this.commmands = data.data;
        this.getTotal(this.commmands);
      }
    );
  
  }
  getTotal(commmands: any) {
    this.Total=0;
    for(let c of commmands){
      this.Total+=c.puartArt;
    }
  }
  delete(idArt: any) {
    this.cartService.removeFromCart(idArt).then(
      (data) => {
        this.ngOnInit()
      }
      );
    }
    deleteAll() {
      this.cartService.remouveAllFromCart().then(
        (data) => {
          this.ngOnInit()
        }
        );
    }

}
