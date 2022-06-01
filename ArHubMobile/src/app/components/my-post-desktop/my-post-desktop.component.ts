import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-my-post-desktop',
  templateUrl: './my-post-desktop.component.html',
  styleUrls: ['./my-post-desktop.component.scss']
})
export class MyPostDesktopComponent implements OnInit {
  postList: any;
  isLoadingResults = true;

  constructor(private _router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getMyPost().subscribe(items => {
      this.postList = items;
      this.isLoadingResults = false;
    });
  }

}
