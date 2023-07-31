import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdminLoggedIn:boolean = false;

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    if(localStorage.getItem("usertype") === "admin"){
      this.isAdminLoggedIn = true;
    }
  }

  logout() {
    localStorage.clear();
    this.isAdminLoggedIn = false;
    this.router.navigate(['/'])
  }
}
