import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categoryid:any;
  category:any;
  products:any;
  baseurl:string = this.api.baseurl;

  constructor(private api:ApiService, private route:ActivatedRoute, private router:Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.paramMap.get("categoryid");
    this.bind();
  }

  private bind() {
      this.api.get("productcategory/get/" + this.categoryid).subscribe((result:any) => {
        this.category = result.data;
      })
      this.api.post("product/getbypcid", {data: { pcid: this.categoryid }}).subscribe((result:any) => {
         this.products = result.data;
      })
  }

}
