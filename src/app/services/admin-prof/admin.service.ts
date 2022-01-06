import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string = "http://localhost:3000";
  allUsers:any;

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

  getAllUsers(): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/profile-admin/users`, { headers: options })
  }
}
