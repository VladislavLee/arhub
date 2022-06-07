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
  VK_URL: string;
  readonly apiUrlDatastore =  API_URL_DATASTORE;

  @Input() post:PostResponse;
  constructor(private postService: PostService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.VK_URL = `https://vk.com/share.php?url=https://ar-hub-mobile-route-nikitadyadechkin-1-dev.apps.sandbox.x8i5.p1.openshiftapps.com&title=${this.post.title}&image=${this.apiUrlDatastore}}/content/${this.post.previewImageId}`;
  }

  openComments(id: string) {
    const bottomSheetRef = this._bottomSheet.open(CommentsModalComponent, {
      data: this.post,
    });
  }
}
