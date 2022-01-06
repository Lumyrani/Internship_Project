import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProfileService } from '../services/profile/profile.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  clicked = false;
  user: any
  loginDetail: any
  id: any
  userObj: any
  userForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    college: new FormControl(''),
    userMobile: new FormControl(''),
    dob: new FormControl(''),
    hometown: new FormControl(''),
    address: new FormControl(''),
    martialStatus: new FormControl('')
  });


  status = [
    { 'id': 'married', 'name': 'Married' },
    { 'id': 'unmarried', 'name': 'Unmarried' },
    { 'id': 'other', 'name': 'Other' }

  ];

  constructor(private _profileService: ProfileService,private router: Router) { }

  ngOnInit() {
    this.loginDetail = localStorage.getItem('item')
    let idStr = JSON.parse(this.loginDetail)
    this.id = idStr.user_id
    this.getUserById()
  }
  getUserById() {
    this._profileService.getUserById(this.id)
      .subscribe(res => {
        this.userObj = res.result
      }, err => {
        console.log("error in getUserById", err)
      })
  }

  onSubmit() {
  
    this.user = this.userForm.value
    console.log("id", this.id)
    this._profileService.getUpdate(this.user, this.id)
      .subscribe(res => {
        console.log("response profile", res)
        alert(" You successfully submitted your personal details, Please fill out educational details form shown on this page")
      }, err => {
        console.log("error in update", err)
        alert(" Error in completing the profile,please enter your email given on this account")
        
      })

  }

}
