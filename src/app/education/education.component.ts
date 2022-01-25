import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ProfileService } from "../services/profile/profile.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.css"],
})
export class EducationComponent implements OnInit {
  clicked = false;
  userObj: any;
  id: any;
  education: any;
  loginDetail: any;
  eduForm = new FormGroup({
    college: new FormControl(""),
    institute: new FormControl(""),
    degree: new FormControl(""),
    department: new FormControl(""),
    state: new FormControl(""),
    boardName: new FormControl(""),
    percentage: new FormControl(""),
  });

  constructor(
    private _profileService: ProfileService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginDetail = localStorage.getItem("item");
    let idStr = JSON.parse(localStorage.getItem("item"));
    this.id = idStr.user_id;
    this.getUserById();
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
    this.education = this.eduForm.value;
    console.log("education form id", this.id);
    console.log("education details", this.education);
    this._profileService.getUpdateEdu(this.education, this.id).subscribe(
      (res) => {
        console.log("response education", res);
        alert(" You successfully submitted your educational details");
      },
      (err) => {
        console.log("error in update", err);
        alert(" Please Login");
      }
    );
  }
}
