
   
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile/profile.service'
import { TestService } from '../services/test/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  loginDetail: any
  id: any
  result: any
  skill_id: any
  _id: any
  ans: any
  questions: any
  questionsArray: any
  constructor(private _profileService: ProfileService, private _testService: TestService) { }
  ngOnInit() {
    this.loginDetail = localStorage.getItem('item')
    let idStr = JSON.parse(this.loginDetail)
    this.id = idStr.user_id
    this.getUserById(this.id)
  }
  getUserById(id) {
    this._profileService.getUserById(id)
      .subscribe(res => {
        console.log("profile response", res)
        this.result = res.result
        this._id = this.result.skill_id
        this._testService.skill_id = this.result.skill_id
        console.log("skill_id", this._id)
        this.startQuiz(this._id)
      }, err => {
        console.log("error", err)
      })
  }
  startQuiz(skill_id) {
    this._testService.seconds = 0;
    this._testService.qnProgress = 0;
    this._testService.score = 0;
    this.startTimer()
    // this._testService.timerQn = setInterval(renderCounter, 1000); // 1000ms = 1s
    this._testService.getQuestionBySkill_Id(skill_id)
      .subscribe(res => {
        this._testService.qns = res.response
        this._testService.lastQn = this._testService.qns.length - 1
        this.renderQuestion(this._testService.qns)
        console.log("questions array", res)
      }, err => {
        console.log("error on getting question -fe", err)
      })

  }
  renderQuestion(questionsArray) {
    let q = questionsArray[this._testService.qnProgress];
    this.ans = questionsArray[this._testService.qnProgress].answer
    const question = document.getElementById("question");
    question.innerHTML = "<h2>" + q.question + "</h2>";

    const choiceA = document.getElementById("A");
    const choiceB = document.getElementById("B");
    const choiceC = document.getElementById("C");
    const choiceD = document.getElementById("D");
    choiceA.innerHTML = q.option1;
    choiceB.innerHTML = q.option2;
    choiceC.innerHTML = q.option3;
    choiceD.innerHTML = q.option4;

  }

  checkAnswer(answer) {
    console.log("a", answer)
    if (answer == this._testService.qns[this._testService.qnProgress].answer) {
      console.log("correct answer")
      this._testService.score++
      if (this._testService.qns.length - 1 > this._testService.qnProgress) {
        this._testService.qnProgress++
        this.renderQuestion(this._testService.qns)
        // this.answerIsCorrect();
      } else {
        alert('test completed' + this._testService.score)

      }
    } else {
      if (this._testService.qns.length - 1 > this._testService.qnProgress) {
        console.log("wrong")
        this._testService.qnProgress++
        this.renderQuestion(this._testService.qns)
        this.answerIsWrong();
      }
      else {
        alert('test completed and your score is ' + '  ' + this._testService.score)
      }
    }
  }

  renderCounter() {
    let questionTime: 10
    let count
    const counter = document.getElementById("counter");
    if (count <= questionTime) {
      counter.innerHTML = count;
      const timeGauge = document.getElementById("timeGauge");
      const gaugeWidth = 150; // 150px
      const gaugeUnit = gaugeWidth / questionTime;
      timeGauge.style.width = count * gaugeUnit + "px";
      count++
    }
    else {
      // count = 0;
      // change progress color to red
      // answerIsWrong();
      // if (this._testService.qns.length - 1 > this._testService.qnProgress) {
      //   runningQuestion++;
      //   renderQuestion();
      // } else {
      //   // end the quiz and show the score
      //   clearInterval(TIMER);
      //   scoreRender();
      // }
    }
  }

answerIsCorrect() {
    document.getElementById('this._testService.qns.length').style.backgroundColor = "#0f0";
}
answerIsWrong() {
    document.getElementById('this._testService.qns.length').style.backgroundColor = "#f00";
}

  startTimer() {
    this._testService.timer = setInterval(() => {
      this._testService.seconds++;
    }, 1000)
  }

}
