import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories:any;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.get('productcategory/list').subscribe((result:any) => {
      this.categories = result.data;
    })
  }
}
