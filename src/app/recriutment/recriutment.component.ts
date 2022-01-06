import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service';
import { Router } from '@angular/router'

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recriutment',
  templateUrl: './recriutment.component.html',
  styleUrls: ['./recriutment.component.css']
})
export class RecriutmentComponent implements OnInit {


questionForm = new FormGroup({
  question: new FormControl(),
  choice1: new FormControl(),
  choice2: new FormControl(),
  choice3: new FormControl(),
  choice4: new FormControl(),
  answer: new FormControl()

})

constructor() { }

ngOnInit() {
}

}

