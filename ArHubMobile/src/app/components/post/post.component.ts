import {Component, Input, OnInit} from '@angular/core';
import {PostResponse} from "../../interfaces/post-response";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post:PostResponse;
  readonly apiUrlDatastore =  environment.API_URL_DATASTORE;

  date = new Date();

  constructor(private _router: Router, private postService: PostService) { }

  ngOnInit(): void {
  }

  openCamera(post: PostResponse) {
    this.postService.getFullPost(post.id).subscribe(value => {
      this.postService.post$.next(value);
      console.log(value)
      this._router.navigate([`/ar-viewer`]);
    })
  }
}
