import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {
  loginDetail:any
  result:any
  constructor(private _profileService:ProfileService) { }

  ngOnInit() {
    this.loginDetail = localStorage.getItem('item')
    let idStr = JSON.parse(this.loginDetail)
    let id = idStr.user_id
    console.log("typ id", typeof (id))
    console.log("id local storage", id)
    this.getUserById(id)
  }
  getUserById(id) {

    this._profileService.getUserById(id)
      .subscribe(res => {
        console.log("response profile", res)

        this.result = res
      }, err => {
        console.log("error", err)
      })
  }


}
