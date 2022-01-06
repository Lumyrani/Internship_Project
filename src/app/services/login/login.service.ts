import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any
  private baseUrl: string = "http://localhost:3000";
 
  constructor(private http: HttpClient, private _router:Router) { }
  initRequestOptions() {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    let headersConfig = new HttpHeaders(headers)
    return headersConfig
  }


  loginUser(user): Observable<any> {
    var datas: any = {}
    datas = user
    var data = JSON.stringify(datas)
    let options = this.initRequestOptions()
    return this.http.post<any>(`${this.baseUrl}/login`, data, { headers: options })
  }

 logout(){
   this.user = null
   localStorage.clear()
   this._router.navigate(['/login'])
 }
 loggedIn(){
  return !!localStorage.getItem('item')
}

}
