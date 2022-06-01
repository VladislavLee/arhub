import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {PostService} from "../../services/post.service";
import {BehaviorSubject} from "rxjs";
import {API_URL_REACT_VIEWER} from "../../../URL_LIST";

@Component({
  selector: 'app-ar-viewer',
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.css']
})
export class ArViewerComponent implements OnInit {
  id: string;
  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  apiUrlReactViewer = API_URL_REACT_VIEWER;

  constructor(
    private activateRoute: ActivatedRoute,
    private _router: Router,
    protected _sanitizer: DomSanitizer,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    const post = this.postService.post$.subscribe(post => {
      console.log(post);
      this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlReactViewer}/ar-viewer/${post.markerImageId}/${post.modelId}/${post.rotation[0]}/${post.rotation[1]}/${post.rotation[2]}/${post.translation[0]}/${post.translation[1]}/${post.translation[2]}/${post.scale[0]}/${post.scale[1]}/${post.scale[2]}`));
    });

  }
}
