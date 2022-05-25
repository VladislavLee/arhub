import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, from, map, Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {PostResponse} from "../interfaces/post-response";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly apiUrlDatastore =  environment.API_URL_DATASTORE;
  readonly apiUrlContentManager = environment.API_URL_CONTENT_MANAGER;
  post$ = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File, name: string) {
    let formData = new FormData();
    formData.append("file", file);
    let response = fetch('http://localhost:8080/upload', {
      method: "POST",
      body: formData
    }).then(res => {
      return res.text()
    });

    return from(response).pipe(
      map(value => {
        return {
          name: name,
          id: value
        }
      })
    );
  }

  uploadImage(file: File, name: string) {
    let formData = new FormData();
    formData.append("file", file);
    let response = fetch('http://localhost:8080/upload/image', {
      method: "POST",
      body: formData
    }).then(res => {
      return res.text()
    });

    return from(response).pipe(
      map(value => {
        return {
          name: name,
          id: value
        }
      })
    );
  }

   uploadModel(file: File, name: string) {
    let formData = new FormData();
    formData.append("file", file);
    let response = fetch('http://localhost:8080/upload/model', {
      method: "POST",
      body: formData
    }).then(res => {
      return res.text()
    });

    return from(response).pipe(
      map(value => {
        return {
          name: name,
          id: value
        }
      })
    );
  }

  createPost(post: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrlContentManager}/posts`, post);
  }

  getRecommendedPosts(count: number = 5, page: number = 0): Observable<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.apiUrlContentManager}/posts/recommended?count=${count}&page=${page}`);
  }

  getFullPost(id: string) {
    return this.httpClient.get(`${this.apiUrlContentManager}/posts/full/${id}`);
  }
}
