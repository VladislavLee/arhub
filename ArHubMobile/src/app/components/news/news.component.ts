import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{

  posts: BehaviorSubject<any> = new BehaviorSubject([]);
  sum = 10;
  pageNumber = 0;
  throttle = 0;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  modalOpen = false;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.appendItems();
  }

  appendItems() {
    this.postService.getRecommendedPosts(5, this.pageNumber).subscribe(value => {
      this.posts.next(this.posts.getValue().concat(value))
      this.pageNumber++;
    });
  }

  onScrollDown() {
    console.log("scrolled down!!");

    this.appendItems();

    this.direction = "down";
  }
}
