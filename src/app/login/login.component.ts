import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { LoginService } from "../services/login/login.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: any;
  x: any;
  _id: any;
  exp: boolean;
  token: any;
  recruiter: boolean;
  employee: true;

  userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.user = this.userForm.value;
    this._loginService.loginUser(this.user).subscribe(
      (res) => {
        console.log("login response", res);
        this.exp = true;
        this._id = res.user_id;
        this.x = JSON.stringify(res);
        localStorage.setItem("item", this.x);
        // commented
        //  this._router.navigate(['/profile'])
        // .......
        for (let i = 0; i < res.roles.length; i++) {
          if (res.roles[i] == "Company HR") {
            this._router.navigate(["/recruitment"]);
          } else if (res.roles[i] == "Interviewer") {
            this._router.navigate(["/recruiter-prof"]);
          } else if (res.roles[i] == "Candidate") {
            this._router.navigate(["/profile"]);
          } else if (res.roles[i] == "Questions Author") {
            this._router.navigate(["/add-question"]);
          } else if (res.roles[i] == "Institute HR") {
            this._router.navigate(["/institute"]);
          }
          // else if(res.roles[i] == "Admin"){
          //   this._router.navigate(['/admin-profile'])

          // }
          else if (res.roles[i] == "College-Placement Officer") {
            this._router.navigate(["/college"]);
          }
        }
        // ------
        // for (let i = 0; i < res.role.length; i++)
        // {
        //   if (res.role[i] == "recruitment-candidate"||"recruitment-interviewer"||"company"||"Interviewer"||"Candidate"||"Questions Author"||"institute") {
        //     this._router.navigate(['/profile'])

        //   }
        //   else if(res.role[i] == "Interviewer"){

        //   }
        // }

        // if (res.roles[0]|| res.roles[1] == "employee") {
        // // if (res.roles[0]|| res.roles[1] == "employee") {
        //   this.employee = true
        //   this._router.navigate(['/profile'])
        // }
        // if (res.roles == "recruiter ") {
        // if (res.roles == "recruitment-candidate ") {
        //   // this.recruiter = true
        //   // this._router.navigate(['/profile'])
        //   this._router.navigate(['/recruitment'])
        // }
      },
      (err) => {
        console.log("logerror", err);
        if (err.status === 401) {
          alert("Login Failed, Invalid Credentials");
        }
        if (err.status === 404) {
          alert("Mail not found");
        }
      }
    );
  }
}

// ------
// ngOnInit(): void {
// }
// loginUser(){
//   // console.log(this.registeredUserData)

// this.authService.loginUser(this.loginUserData).subscribe(
//   res=>{
//     this.router.navigate(['/registered'])
//     console.log(res)
//     localStorage.setItem('token',res.token)
//   },
//   err=>console.log(err)
// )
// }
// }
