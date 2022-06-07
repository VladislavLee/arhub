import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {API_URL_DATASTORE} from "../../../URL_LIST";

@Component({
  selector: 'app-user-account-mobile',
  templateUrl: './user-account-mobile.component.html',
  styleUrls: ['./user-account-mobile.component.scss']
})
export class UserAccountMobileComponent implements OnInit {
  user: any;
  apiUrlDatastore = API_URL_DATASTORE;
  isMobile: boolean;
  posts: BehaviorSubject<any> = new BehaviorSubject([]);
  sum = 10;
  pageNumber = 0;
  throttle = 0;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  modalOpen = false;
  subscribers: any;
  isSubscribe = false;
  publications: any;

  constructor(private postService: PostService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.appendItems();
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.getUserById(params.params.id);
      }
    });
  }

  subscribe() {
    console.log(111)
    this.isSubscribe = !this.isSubscribe;
  }

  appendItems() {
    this.postService.getRecommendedPosts(5, this.pageNumber).subscribe(value => {
      this.posts.next(this.posts.getValue().concat(value))
      this.pageNumber++;
    });
  }

  navigateToSubscribes() {
    this.router.navigate([`/users-mobile/${this.user.id}`]);
  }

  getUserById(id: string) {
      this.userService.getUserById(id).subscribe(user => {
        this.subscribers = user.subscribers;
        this.publications = user.publications;
        this.user = user;
      })
  }

  onScrollDown() {
    console.log("scrolled down!!");

    this.appendItems();

    this.direction = "down";
  }

}
