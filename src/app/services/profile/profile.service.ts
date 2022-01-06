import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

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



  getUserById(id): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/profile/${id}`, { headers: options })
  }

  getIdByuserId(id): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/education/${id}`)
  }

  getUpdate(user, id): Observable<any> {
    var datas: any = {}
    datas = user
    var data = JSON.stringify(datas)
    console.log("data", data)
    console.log("id service", id)
    console.log("user service", user)
    let options = this.initRequestOptions()
    return this.http.post<any>(`${this.baseUrl}/personal/${id}`, data, { headers: options })
  }

  getUpdateEdu(user, id): Observable<any> {
    var datas: any = {}
    datas = user
    var data = JSON.stringify(datas)
    console.log("data", data)
    console.log("id service", id)
    console.log("user service", user)
    let options = this.initRequestOptions()
    return this.http.post<any>(`${this.baseUrl}/educational/${id}`, data, { headers: options })
  }

  getUpdateTech(user, id): Observable<any> {
    var datas: any = {}
    datas = user
    var data = JSON.stringify(datas)
    console.log("data", data)
    console.log("id service", id)
    console.log("user service", user)
    let options = this.initRequestOptions()
    return this.http.post<any>(`${this.baseUrl}/technical/${id}`, data, { headers: options })
  }

  getAllSkills(): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/skill`, { headers: options })

  }

}