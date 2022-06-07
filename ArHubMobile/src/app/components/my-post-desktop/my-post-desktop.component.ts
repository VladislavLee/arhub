import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-my-post-desktop',
  templateUrl: './my-post-desktop.component.html',
  styleUrls: ['./my-post-desktop.component.scss']
})
export class MyPostDesktopComponent implements OnInit {
  postList: BehaviorSubject<any> = new BehaviorSubject({});
  isLoadingResults = true;

  constructor(private _router: Router,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getMyPost().subscribe(items => {
      this.postList.next(items);
      this.isLoadingResults = false;
    });
  }

  refresh(){
    this.postService.getMyPost().subscribe(items => {
      console.log("ref")
      this.postList.next(items);
      this.isLoadingResults = false;
    });
  }

}
