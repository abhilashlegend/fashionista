import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:any;
  baseurl = this.api.baseurl;
  formdata:any;
  imagestring:any;

  constructor(private api: ApiService) { 

  }

  ngOnInit(): void {
    this.api.get("productcategory/list").subscribe((result:any) => {
      this.categories = result.data;
    })

    this.formdata = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
      srno: new FormControl("", Validators.required),
      image: new FormControl("")
    })
  }

  onClickSubmit(formdata:any){
    formdata.image = this.imagestring;
    console.log(formdata);
    this.api.post("productcategory/save", formdata).subscribe(result => {
      console.log(result);
    });
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
