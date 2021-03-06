import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile/profile.service";
import { Router } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-recriutment",
  templateUrl: "./recriutment.component.html",
  styleUrls: ["./recriutment.component.css"],
})
export class RecriutmentComponent implements OnInit {
  form: FormGroup;
  clicked = false;
  tclicked = false;
  user: any;


  id: any;
  result: any;
  loginDetail: any;
  userObj: any;
  skills: any;
  tech: any;
  skill: any;


  userForm = new FormGroup({
    fullName: new FormControl(""),
    email: new FormControl("", [Validators.required]),
    userMobile: new FormControl(""),
  });

  technicalForm = new FormGroup({
    companyName: new FormControl(""),
    skill: new FormControl(""),

  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _loginService: LoginService,
    private _profileService: ProfileService
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
    });
  }

  ngOnInit() {

    this.getAllSkills();
    this.loginDetail = localStorage.getItem("item");
    let idStr = JSON.parse(this.loginDetail);
    this.id = idStr.user_id;
    this.getUserById();
  }
  onCheckboxChanges(e) {
    const checkArray: FormArray = this.form.get("checkArray") as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.skill) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this._profileService
      .getUpdateTech(this.user, this.id)
      .subscribe((response) => {
        this.form.controls["skill"].setValue("checkArray");
      });

    console.log(this.form.value);
  }
  getAllSkills() {
    this._profileService.getAllSkills().subscribe(
      (res) => {
        this.skills = res;
        console.log("fe skills", res);
      },
      (err) => {
        console.log("error in skills", err);
      }
    );
  }
  getUserById() {
    this._profileService.getUserById(this.id).subscribe(
      (res) => {
        this.userObj = res.result;
      },
      (err) => {
        console.log("error in getUserById", err);
      }
    );
  }

  onSubmit() {
    this.user = this.userForm.value;
    console.log("id", this.id);
    this._profileService.getUpdate(this.user, this.id).subscribe(
      (res) => {
        console.log("response profile", res);
        alert(
          " You successfully submitted your personal details, Please fill out educational details form shown on this page"
        );
      },
      (err) => {
        console.log("error in update", err);
        alert(
          " Error in completing the profile,please enter your email given on this account"
        );
      }
    );
  }

  onCheckboxChange(e) {


    if (e.target.checked) {

      this._profileService
        .getUpdateTech(this.user, this.id)
        .subscribe((response) => {
    
          this.technicalForm.controls["skill"].setValue(e.target.value);
 
        });
    }
  }
  addskill() {
    this.skill.push(new FormControl(""));
  }

  onTSubmit() {
    this.user = this.technicalForm.value;
    console.log("techupdate", this.user);
    this._profileService.getUpdateTech(this.user, this.id).subscribe(
      (res) => {
        console.log("response in technical user upload", res);
     
      },
      (err) => {
        console.log("error on technical details submission ", err);
      }
    );
  }
}
