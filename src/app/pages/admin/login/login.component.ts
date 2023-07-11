import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata:any;
  message!:string;

  constructor(private api:ApiService){

  }

  ngOnInit():void{
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  onClickSubmit(data:any) {
    console.log(data);
    this.api.post("admin/login", {data: data}).subscribe((result:any) => {
      if(result.data.status == "success"){
        alert("Success");
      } else {
        this.message = "Username or password is wrong!";
      }
    })
  }
}
