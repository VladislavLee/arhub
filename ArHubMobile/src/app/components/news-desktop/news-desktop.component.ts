import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-news-desktop',
  templateUrl: './news-desktop.component.html',
  styleUrls: ['./news-desktop.component.scss'],
})
export class NewsDesktopComponent implements OnInit {

  posts: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getRecommendedPosts(100, 0).subscribe(value => {
      this.posts.next(this.posts.getValue().concat(value))
    });
  }

}
