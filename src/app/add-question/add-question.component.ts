import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfileService } from "../services/profile/profile.service";
import { TestService } from "../services/test/test.service";
import { LoginService } from "../services/login/login.service";
@Component({
  selector: "app-add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.css"],
})
export class AddQuestionComponent implements OnInit {
  question: any;
  result: any;
  loginDetail: any;
  skill_id: any;
  _id: any;
  skills: any;
  tech: any;
  skill: any;
  id: any;
  user: any;
  userObj: any;
  userForm = new FormGroup({
    fullName: new FormControl(""),
    email: new FormControl("", [Validators.required]),

    institute: new FormControl(""),
    userMobile: new FormControl(""),
  });

  questionForm = new FormGroup({
    skill_id: new FormControl(),
    question: new FormControl(),
    option1: new FormControl(),
    option2: new FormControl(),
    option3: new FormControl(),
    option4: new FormControl(),
    answer: new FormControl(),
  });

  technicalForm = new FormGroup({
    skill: new FormControl(""),
  });

  constructor(
    private _loginService: LoginService,
    private _testService: TestService,
    private _router: Router,
    private _profileService: ProfileService
  ) {}

  ngOnInit() {
    this.getAllSkills();
    this.loginDetail = localStorage.getItem("item");
    let idStr = JSON.parse(this.loginDetail);
    this.id = idStr.user_id;
    this.getUserById();
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
  onCheckboxChange(e) {
    if (e.target.checked) {
      this._profileService
        .getUpdateTech(this.user, this.id)
        .subscribe((response) => {
          this.technicalForm.controls["skill"].setValue(e.target.value);
        });
    }
  }
  onSubmit() {
    this.questionForm.controls["skill_id"].setValue(this.user.skill);
    this.question = this.questionForm.value;

    console.log("question id", this.id);
    console.log("question details", this.question);
    this._testService.postQuestion(this.question, this.user.skill).subscribe(
      (res) => {
        console.log("response question", this.question);
        console.log("response id", this.id);
        alert(" You successfully added your questions");
      },
      (err) => {
        console.log("error in update", err);
        alert(" Please Login");
      }
    );
  }
  onFSubmit() {
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
  onTSubmit() {
    this.user = this.technicalForm.value;
    console.log("techupdate", this.user);
    this._profileService.getUpdateTech(this.user, this.id).subscribe(
      (res) => {
        console.log("response in technical user upload", res);
        // alert(" You successfully submitted your educational details")
      },
      (err) => {
        console.log("error on technical details submission ", err);
      }
    );
  }
}
