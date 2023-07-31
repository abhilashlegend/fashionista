import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata:any;
  errormsg:string = "";

  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      mobileno: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      pincode: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      cpassword: new FormControl("", Validators.required)
    })
  }

  submit(formdata:any) {
    if(formdata.password != formdata.cpassword){
      alert("Password and confirm password not matching")
    }

    this.api.post("user/register", {data:formdata}).subscribe((result:any) => {
      if(result.status == "success"){
        this.route.navigate(["/login"]);
        alert("Registeration successfull")
      } else {
        this.errormsg = ""
      }
    })

  }

}
