import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service'
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css']
})
export class TechnicalComponent implements OnInit {
  clicked = false;
  skills: any
  technicalDetail: any
  loginDetail: any
  id: any
  userObj: any
  user: any
  technicalForm = new FormGroup({
    companyName: new FormControl(''),
    skill: new FormControl('')
  })

  constructor(private _profileService: ProfileService, private _router: Router) { }

  ngOnInit() {
    this.getAllSkills()
    this.loginDetail = localStorage.getItem('item')
    let idStr = JSON.parse(this.loginDetail)
    this.id = idStr.user_id
  }
  getAllSkills() {
    this._profileService.getAllSkills()
      .subscribe(res => {
        this.skills = res
        console.log("fe skills", res)
      }, err => {
        console.log("error in skills", err)
      })
  }
  showTest(){
    this._router.navigate(['/test'])
  }
  onSubmit() {
    this.user = this.technicalForm.value
    this._profileService.getUpdateTech(this.user, this.id)
      .subscribe(res => {
        console.log("response in technical user upload", res)
        // alert(" You successfully submitted your educational details")
      }, err => {
        console.log("error on technical details submission ", err)
      })
  }
}
