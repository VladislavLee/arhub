import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderStoriesComponent implements OnInit {
  popularPostList1: any;
  popularPostList2: any;
  popularPostList3: any;

  mockPostMiniList = [
    {
      src: '../../../assets/image/pic-2.png',
      title: 'Волшебный замок',
      date: '01.04.2022'
    },
    {
      src: '../../../assets/image/2.jpeg',
      title: 'Водопад',
      date: '06.04.2022'
    },
    {
      src: '../../../assets/image/3.jpeg',
      title: 'Цветы',
      date: '21.04.2022'
    },
    {
      src: '../../../assets/image/images.jpeg',
      title: 'Новый год',
      date: '12.04.2022'
    },
    {
      src: '../../../assets/image/3.jpeg',
      title: 'Цветы',
      date: '21.04.2022'
    },
    {
      src: '../../../assets/image/images.jpeg',
      title: 'Новый год',
      date: '12.04.2022'
    }
  ]

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPopularPost().subscribe(value => {
      this.popularPostList1.push(value[0],value[1]);
      this.popularPostList2.push(value[2],value[3]);
      this.popularPostList3.push(value[4],value[5]);
    })
  }
}
