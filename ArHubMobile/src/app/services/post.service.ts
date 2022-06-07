import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, from, map, Observable, of, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {PostResponse} from "../interfaces/post-response";
import {API_URL_CONTENT_MANAGER, API_URL_DATASTORE} from "../../URL_LIST";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly apiUrlDatastore =  API_URL_DATASTORE;
  readonly apiUrlContentManager = API_URL_CONTENT_MANAGER;
  post$ = new BehaviorSubject<any>([]);
  postId$ = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File, name: string) {
    let formData = new FormData();
    formData.append("file", file);
    let response = fetch(`${this.apiUrlDatastore}/upload`, {
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
    let response = fetch(`${this.apiUrlDatastore}/upload/image`, {
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
    let response = fetch(`${this.apiUrlDatastore}/upload/model`, {
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
    return this.httpClient.get(`${this.apiUrlContentManager}/posts/${id}`);
  }

  getMyPost(): Observable<any> {
    return this.httpClient.get(`${this.apiUrlContentManager}/posts/my`);
  }

  getPostsByStatus(status: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrlContentManager}/posts/status/${status}`);
  }

  getPopularPost(): Observable<any> {
    return this.httpClient.get(`${this.apiUrlContentManager}/posts/popular`);
  }

  updatePost(request: any) {
    return this.httpClient.patch(`${this.apiUrlContentManager}/posts`, request);
  }

  likePost(id: string) {
    return this.httpClient.post(`${this.apiUrlContentManager}/likes/like/${id}`, '');
  }

  unLikePost(id: string) {
    return this.httpClient.post(`${this.apiUrlContentManager}/likes/unlike/${id}`, '');
  }

  addComment(comment: string, id: string) {
    return this.httpClient.post(`${this.apiUrlContentManager}/comment/${id}`, {text: comment});
  }

  getComments(id: string) {
    return this.httpClient.get(`${this.apiUrlContentManager}/comment/${id}`);
  }

  validatePost(id: string) {
    return this.httpClient.post(`${this.apiUrlContentManager}/validate/${id}`, '');
  }

  invalidatePost(id: string) {
    return this.httpClient.post(`${this.apiUrlContentManager}/invalidate/${id}`, '');
  }

  mockPopularPost = [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "previewImageId": "string",
      "title": "Title"
    },
  ]

  mockMyPost = [
    {
      "author": {
        "avatarImageId": null,
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "username": "John"
      },
      "commentCount": 1,
      "cratedTime": 5,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastRated": [
        {
          "avatarImageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "username": "Lisa"
        }
      ],
      "likeCount": 45,
      "previewImageId": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "title": "Title"
    }
  ];


  mockFullPost = {
    "author": {
      "avatarImageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "username": "string"
    },
    "commentCount": 0,
    "description": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "lastRated": [
      {
        "avatarImageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "username": "string"
      }
    ],
    "likeCount": 0,
    "markerImageId": "string",
    "markerVanillaMarkerId": "string",
    "modelId": "string",
    "previewImageId": "string",
    "rotation": [
      0
    ],
    "scale": [
      0
    ],
    "title": "string",
    "translation": [
      0
    ]
  }

  downloadImage(imgSrc: any, name: string): Observable<any> {
    return this.httpClient.get(imgSrc, {responseType: 'blob' as 'json'}).pipe(
      map(value => {
        return {
          name: name,
          file: value
        }
      })
    );
    // .subscribe((res: any) => {
    //   const blob = new Blob([res], {type: res.type});
    //   const file = new File([blob], "file");file
    // });
  }
}
