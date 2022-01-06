import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

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
