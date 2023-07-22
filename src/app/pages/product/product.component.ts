import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  id:any;
  product:any;
  baseurl:string;

  constructor(private api: ApiService, private route:ActivatedRoute) {
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.api.get("product/get/" + this.id).subscribe((result:any) => {
      this.product = result.data;
      console.log(this.product);
    })
  }
}
