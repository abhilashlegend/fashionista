import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  products:any;
  baseurl!:string;
  subtotal:number = 0.0;
  delivery:number = 0.0;
  grandtotal:number = 0.0;
  user:any;
  formdata:any;

  constructor(private router:Router, private api: ApiService, private cartService: CartService){
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
    if(localStorage.getItem("usertype") === null){
      this.router.navigate(["/login"]);
    }
     this.bind();
  }


  bind() {

  

    this.products = JSON.parse(localStorage.getItem("products") || "[]");
    this.subtotal = 0.0;
    this.delivery = 0.0;
    this.grandtotal = 0.0;
    this.api.get("user/" + localStorage.getItem("id")).subscribe((result:any) => {
      this.user = result.data;
          this.formdata = new FormGroup({
      userid: new FormControl(localStorage.getItem("id")),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
      state: new FormControl(this.user.state, Validators.required),
      pincode: new FormControl(this.user.pincode, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(6)]))
    })
    })

    if(this.products.length == 0){
      this.router.navigate(['/']);
    } else {
      for(let i = 0; i < this.products.length; i++){
        this.subtotal += this.products[i].price * this.products[i].quantity;
      }
      this.grandtotal = this.subtotal + this.delivery;
    }


  }

  submitHandler(formdata:any) {
    const orderproducts = new Array();
    this.products.forEach((product:any) => {
      let orderproduct = {
        productid: product.id,
        name: product.name,
        color: product.color,
        size: product.size,
        quantity: product.quantity,
        price: product.price,
        total: product.quantity * product.price
      }
      orderproducts.push(orderproduct);
    });


    const data = {
      userid: formdata.userid,
      orderdate: new Date(),
      address: formdata.address,
      city: formdata.city,
      state: formdata.state,
      pincode: formdata.pincode,
      totalamount: this.subtotal,
      shipmentamount: this.delivery,
      billamount: this.grandtotal,
      products: orderproducts
    };

    this.api.post("order/place", {data:data}).subscribe((result:any) => {
      console.log(result);
    })
  }
}
