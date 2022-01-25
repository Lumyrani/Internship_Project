import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import { ProfileService } from "../services/profile/profile.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  user: any;
  id: any;
  result: any;
  loginDetail: any;
  constructor(
    private _profileService: ProfileService,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginDetail = localStorage.getItem("item");
    let idStr = JSON.parse(this.loginDetail);
    let id = idStr.user_id;
    this.getUserById(id);
  }

  onLogoutClick() {
    this._loginService.logout();
    localStorage.removeItem("item");
    this._router.navigate(["/login"]);
  }
  getUserById(id) {
    this._profileService.getUserById(id).subscribe(
      (res) => {
        console.log("getUserById response", res);
        this.result = res.result;
      },
      (err) => {
        console.log("error", err);
      }
    );
  }
}
