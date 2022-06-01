import {Component, Input, OnInit} from '@angular/core';
import {PostResponse} from "../../interfaces/post-response";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommentsModalComponent} from "../comments-modal/comments-modal.component";
import {API_URL_DATASTORE} from "../../../URL_LIST";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post:PostResponse;
  readonly apiUrlDatastore =  API_URL_DATASTORE;

  date = new Date();

  constructor(private _router: Router, private postService: PostService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openCamera(post: PostResponse) {
    this.postService.getFullPost(post.id).subscribe(value => {
      this.postService.post$.next(value);
      console.log(value)
      this._router.navigate([`/ar-viewer`]);
    })
  }

  openComments() {
    this._bottomSheet.open(CommentsModalComponent);
  }
}
