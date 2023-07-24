import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCount = 0;
  cartCountEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  getCartCount():number {
    return this.cartCount;
  }

  setCartCount(count:number):void {
    this.cartCount = count;
    this.cartCountEmitter.emit(this.cartCount);
  }
}
