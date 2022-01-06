import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl: string = "http://localhost:3000";
  private proxyurl = "https://cors-anywhere.herokuapp.com/";

  constructor(private http: HttpClient) { }

  initRequestOptions() {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    let headersConfig = new HttpHeaders(headers)
    return headersConfig
  }

  postUser(user): Observable<any> {
    var datas: any = {}
    datas = user
    var data = JSON.stringify(datas)
    console.log("postUser", data)
    let options = this.initRequestOptions()
    return this.http.post<any>(`${this.baseUrl}/register`, data, { headers: options })
  }

  getUser(user) {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/users`, { headers: options })

  }
  getAllRoles(): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/roles`, { headers: options })
  }

getAllColleges(): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/colleges`, { headers: options })
  }
}
