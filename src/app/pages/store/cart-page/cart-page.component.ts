import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  public cart: Cart = new Cart();
  public isCartEmpty = false;

  constructor() { }

  ngOnInit() {
    this.loadCart();
  }

  public loadCart() {
    var cart = this.cart = CartUtil.get();
    if(cart.items.length == 0){
      this.isCartEmpty = true;
    }else{
      this.isCartEmpty = false
    }
  }

  public remove(item: any){
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }

  public total(){
    let total = 0;
    this.cart.items.forEach((item) => {
      total += (item.price * item.quantity);
    });
    return total;
  }
}
