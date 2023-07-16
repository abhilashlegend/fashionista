import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories:any;
  baseurl:string;

  constructor(private api: ApiService) {
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
    this.api.get("productcategory/list").subscribe((result:any) => {
      this.categories = result.data;
    })
  }

}
