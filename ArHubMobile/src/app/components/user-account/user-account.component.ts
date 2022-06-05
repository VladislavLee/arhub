import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  postList: any;
  isLoadingResults = true;

  constructor(private _router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getMyPost().subscribe(items => {
      this.postList = items;
      this.isLoadingResults = false;
    });
  }
}
