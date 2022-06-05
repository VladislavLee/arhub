import {Component, Input, OnInit} from '@angular/core';
import {PostResponse} from "../../interfaces/post-response";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommentsModalComponent} from "../comments-modal/comments-modal.component";
import {API_URL_DATASTORE} from "../../../URL_LIST";
import {mergeMap} from "rxjs";
import {ModelViewerModalComponent} from "../model-viewer-modal/model-viewer-modal.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post:PostResponse;
  readonly apiUrlDatastore =  API_URL_DATASTORE;
  liked = true;
  date = new Date();

  VK_URL: string;

  constructor(
    private _router: Router,
    private postService: PostService,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.post);
    this.VK_URL = `https://vk.com/share.php?url=https://ar-hub-mobile-route-nikitadyadechkin-1-dev.apps.sandbox.x8i5.p1.openshiftapps.com&title=${this.post.title}&image=${this.apiUrlDatastore}}/content/${this.post.previewImageId}`;
  }

  openCamera(post: PostResponse) {
    this.postService.getFullPost(post.id).subscribe(value => {
      this.postService.post$.next(value);
      console.log(value)
      this._router.navigate([`/ar-viewer`]);
    })
  }

  openViewerModal() {
    this.dialog.open(ModelViewerModalComponent, {
      // width: '250px',
      data: {src: `${API_URL_DATASTORE}/content/${this.post.modelId}`, id: this.post.id},
    });
  }

  openComments() {
    const bottomSheetRef = this._bottomSheet.open(CommentsModalComponent, {
      data: this.post,
    });
  }

  like(id: string) {
    this.liked
      ? this.postService.likePost(id).subscribe(() => this.post.likeCount++)
      : this.postService.unLikePost(id).subscribe(() => this.post.likeCount--);
    this.liked = !this.liked;
  }
}
