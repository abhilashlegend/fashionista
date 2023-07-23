import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productvarieties',
  templateUrl: './productvarieties.component.html',
  styleUrls: ['./productvarieties.component.css']
})
export class ProductvarietiesComponent implements OnInit {

  id:any;
  formdata:any;
  product:any;

  constructor(private api: ApiService, private route: ActivatedRoute){

  }

  private bind() {
    this.api.get("product/get/" + this.id).subscribe((result:any) => {
      this.product = result.data;
    });

    this.formdata = new FormGroup({
      id: new FormControl(this.id),
      color: new FormControl("", Validators.required),
      size: new FormControl("", Validators.required),
      mrp: new FormControl(0, Validators.required),
      price: new FormControl(0, Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.bind();
  }

  public onClickSubmit(formdata:any){
    const prodObj = {id: this.id, variety: {color: formdata.color, size: formdata.size, mrp: formdata.mrp, price: formdata.price }}
    this.api.post("product/savevariety", {data: prodObj}).subscribe((result:any) => {
      this.bind();
    })
  }

  public deleteVariety(variety:any){
    if(confirm("Are you sure you want to delete?")){
      const object = {id: this.id, variety: variety};
      this.api.post("product/deletevariety", {data: object}).subscribe((result:any) => {
        this.bind();
      })
    }
  }

}
