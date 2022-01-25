import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl: string = "http://localhost:3000";

  seconds: number
  timer
  timerQn
  qnProgress: number
  qns: any[]
  score: number
  skill_id: any
  lastQn: number

  constructor(private http: HttpClient) { }
  
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60)
  }
  initRequestOptions() {
    let tokenstr = localStorage.getItem('item');
    let tokenparse = JSON.parse(tokenstr)
    let token = tokenparse.token
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    }
    let headersConfig = new HttpHeaders(headers)
    return headersConfig
  }
  getQuestionBySkill_Id(id): Observable<any> {
    console.log("id in service", id)
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/question/${id}`, { headers: options })
  }
  postQuestion(question,id): Observable<any> {
    var datas: any = {}
    datas = question
    var data = JSON.stringify(datas)
    console.log("postQuestion", data)
    console.log("id service", id)
    console.log("question service", question)
    let options = this.initRequestOptions()
    return this.http.post<any>(`${this.baseUrl}/question/${id}`, data, { headers: options })
  }

}
