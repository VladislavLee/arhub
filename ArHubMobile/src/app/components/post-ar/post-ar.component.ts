import {Component, Input, OnInit} from '@angular/core';
import {CommentsModalComponent} from "../comments-modal/comments-modal.component";
import {PostService} from "../../services/post.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PostResponse} from "../../interfaces/post-response";
import {API_URL_DATASTORE} from "../../../URL_LIST";

@Component({
  selector: 'app-post-ar',
  templateUrl: './post-ar.component.html',
  styleUrls: ['./post-ar.component.scss']
})
export class PostArComponent implements OnInit {

  readonly apiUrlDatastore =  API_URL_DATASTORE;

  @Input() post:PostResponse;
  constructor(private postService: PostService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openComments() {
    this._bottomSheet.open(CommentsModalComponent);
  }
}
