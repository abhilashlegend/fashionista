import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formdata:any;
  categories:any;
  imagestring:string;

  constructor(private api:ApiService) {
    this.imagestring = "";
  }

  ngOnInit(): void {
    this.api.get("productcategory/list").subscribe((result:any) => {
      this.categories = result.data;
    }, error => {
      console.log(error);
    })

    this.formdata = new FormGroup({
      id: new FormControl(""),
      pcid: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      specification: new FormControl("", Validators.required),
      mrp: new FormControl(0, Validators.required),
      price: new FormControl(0, Validators.required),
      instock: new FormControl("Yes", Validators.required),
      isactive: new FormControl("Yes", Validators.required),
      image: new FormControl("")
    })    
  }

  onClickSubmit(data:any) {

  }

  imageChanged($event: Event){

  }
}
