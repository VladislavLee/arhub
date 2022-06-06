import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PostService} from "../../services/post.service";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-my-post-mobile',
  templateUrl: './my-post-mobile.component.html',
  styleUrls: ['./my-post-mobile.component.scss']
})
export class MyPostMobileComponent implements OnInit {
  posts: any;
  sum = 10;
  pageNumber = 0;
  throttle = 0;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  modalOpen = false;
  isMobile: boolean;

  constructor(private postService: PostService, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.appendItems();
    this.isMobile = this.deviceService.isMobile();
  }

  appendItems() {
    this.postService.getMyPost().subscribe(value => this.posts = value);
  }

  onScrollDown() {
    console.log("scrolled down!!");

    this.appendItems();

    this.direction = "down";
  }
}
