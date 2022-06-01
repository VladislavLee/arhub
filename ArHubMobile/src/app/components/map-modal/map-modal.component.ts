import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {PostService} from "../../services/post.service";
import {environment} from "../../../environments/environment";
import {API_URL_DATASTORE} from "../../../URL_LIST";

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})
export class MapModalComponent implements OnInit {

  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  readonly apiUrlDatastore = API_URL_DATASTORE;

  constructor(private postService: PostService,
              private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.postService.postId$.subscribe(value => {
      this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlDatastore}/content/map/dragger.html?id=${value}`))
    })
  }

}
