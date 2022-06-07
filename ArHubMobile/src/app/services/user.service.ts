import { Injectable } from '@angular/core';
import {API_URL_CONTENT_MANAGER} from "../../URL_LIST";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiUrlContentManager = API_URL_CONTENT_MANAGER;

  constructor(private httpClient: HttpClient) { }

  getUserIdByUsername(username: string){
    return this.httpClient.get(`${this.apiUrlContentManager}/users/${username}/id`);
  }

  getUserById(userId: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrlContentManager}/users/${userId}`);
  }
}
