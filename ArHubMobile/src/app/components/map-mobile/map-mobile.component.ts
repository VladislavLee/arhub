import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {API_URL_DATASTORE} from "../../../URL_LIST";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-map-mobile',
  templateUrl: './map-mobile.component.html',
  styleUrls: ['./map-mobile.component.scss']
})
export class MapMobileComponent implements OnInit {

  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  readonly apiUrlDatastore = API_URL_DATASTORE;

  constructor(private postService: PostService,
              private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.postService.postId$.subscribe(value => {
      this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlDatastore}/content/map/placemark.html`))
    })
  }

}
