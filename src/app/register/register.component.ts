import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../services/register/register.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  user: any;
  roleses: any;
  collegeses: any;
  regUser: any;
  roles: any = [];
  userForm = new FormGroup({
    roles: new FormControl(""),
    fullName: new FormControl("", [Validators.required]),
    email: new FormControl(""),
    password: new FormControl(""),
    userMobile: new FormControl(""),
    colleges: new FormControl(""),
  });
  constructor(
    private _registerService: RegisterService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getAllRoles();
  }

  onSubmit() {
    this.user = this.userForm.value;

    this._registerService.postUser(this.user).subscribe(
      (res) => {
        console.log("user response", res);
        alert(" succefully completed new profile");
        this._router.navigate(["/login"]);
      },
      (err) => {
        alert(err.error.message["0"].constraints.isEmail);
        console.log("error on reg", err);
      }
    );
  }

  getAllRoles() {
    this._registerService.getAllRoles().subscribe(
      (res) => {
        this.roleses = res;
        console.log("roles response", this.roleses);
      },
      (err) => {
        console.log("error on loading roles", err);
      }
    );
  }
}
