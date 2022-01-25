import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile/profile.service";
import { LoginService } from "../services/login/login.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  id: any;
  result: any;
  loginDetail: any;
  selectedFile: File;
  pic: any;
  constructor(
    private _profileService: ProfileService,
    private http: HttpClient,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginDetail = localStorage.getItem("item");
    if (this.loginDetail == null) {
      this._router.navigate(["/login"]);
    } else {
      let idStr = JSON.parse(this.loginDetail);
      let id = idStr.user_id;
      this.getUserById(id);
    }
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append("myFile", this.selectedFile, this.selectedFile.name);
    this.http
      .post("my-backend.com/file-upload", uploadData)
      .subscribe((res) => {
        this.pic = res;
      });
  }
}
