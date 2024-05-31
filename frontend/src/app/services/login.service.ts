import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HtmlParser } from '@angular/compiler';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(username: string, password: string): Observable<String> {
    const htmlParams = new HttpParams({ fromString: `username=${username}&password=${password}` });
    return this.apiService.get('http://localhost:5034/login', {params: htmlParams});
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

}
