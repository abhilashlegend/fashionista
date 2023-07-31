import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata:any;
  errormsg:string = "";

  constructor(private api: ApiService, private route: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  onClickSubmit(formdata:any){
      this.api.post("user/login", {data: formdata}).subscribe((result:any) => {
        console.log(result);
        if(result.status == "success"){
          localStorage.setItem("usertype", "user");
          localStorage.setItem("name", result.data.name);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("id", result.data._id);
          this.userService.setUserLoggedIn(true);
          this.userService.setUsername(result.data.name);
          this.route.navigate(["/"]);
        }
      })
  }

}
