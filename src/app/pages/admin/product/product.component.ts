import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id:any = "";
  formdata:any;
  categories:any;
  imagestring:string;
  product:any;
  selectedCategoryId: any;

  constructor(private api:ApiService, private route:ActivatedRoute, private router: Router) {
    this.imagestring = "";
    this.selectedCategoryId = "";
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    
    this.api.get("productcategory/list").subscribe((result:any) => {
      this.categories = result.data;
    }, error => {
      console.log(error);
    })

    if(this.id !== null){
      this.api.get("product/get/" + this.id).subscribe((result:any) => {
        this.product = result.data;
        this.selectedCategoryId = this.product.pcid;
        this.bind();
      })
    } else {
      this.bind();
    }

    
  }

  private bind() {

    this.formdata = new FormGroup({
      id: new FormControl(this.product == null ? "" : this.product._id),
      pcid: new FormControl(this.product == null ? "" : this.product.pcid, Validators.required),
      name: new FormControl(this.product == null ? "" : this.product.name, Validators.required),
      description: new FormControl(this.product == null ? "" : this.product.description, Validators.required),
      specification: new FormControl(this.product == null ? "" : this.product.specification, Validators.required),
      mrp: new FormControl(this.product == null ? 0 : this.product.mrp, Validators.required),
      price: new FormControl(this.product == null ? 0 : this.product.price, Validators.required),
      instock: new FormControl(this.product == null ? "" : this.product.instock, Validators.required),
      isactive: new FormControl(this.product == null ? "" : this.product.isactive, Validators.required),
      imagePath: new FormControl(this.product == null ? "" : this.product.imagePath)
    });
    
  }

  onClickSubmit(data:any) {
    data.imagePath = this.imagestring;
    if(data.id == ''){
      this.api.post("product/save", {data: data}).subscribe((result:any) => {
        this.router.navigate(['/admin/products'])
      }, error => {
        console.log(error);
      })
    } else {
      this.api.update("product/update", data.id, data).subscribe((result:any) => {
        this.router.navigate(['/admin/products'])
      }, error => {
        console.log(error);
      })
    }
  
    
  }

  imageChanged(event:any){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result != null){
        this.imagestring = reader.result.toString();
      }
    }
  }

}
