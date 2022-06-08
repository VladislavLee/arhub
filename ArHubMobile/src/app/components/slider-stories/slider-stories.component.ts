import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderStoriesComponent implements OnInit {
  popularPostList1: any = [];
  popularPostList2: any = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPopularPost().subscribe((value: any[]) => {
      this.popularPostList1.push(value[0]);
      this.popularPostList1.push(value[1]);
      this.popularPostList2.push(value[2]);
      this.popularPostList2.push(value[3]);
    })
  }
}
