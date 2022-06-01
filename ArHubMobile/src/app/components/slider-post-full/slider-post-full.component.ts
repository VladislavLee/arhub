import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Pagination } from "swiper";
import {PostResponse} from "../../interfaces/post-response";
import {PostService} from "../../services/post.service";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-slider-post-full',
  templateUrl: './slider-post-full.component.html',
  styleUrls: ['./slider-post-full.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderPostFullComponent implements OnInit {
  popularPostList: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPopularPost().subscribe(value => {
      this.popularPostList = value.slice(-5);
      console.log(this.popularPostList.length)
    })
  }

}
