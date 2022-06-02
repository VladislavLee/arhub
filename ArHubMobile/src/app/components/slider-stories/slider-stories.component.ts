import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderStoriesComponent implements OnInit {

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
  ]

  arr = [
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

  constructor() { }

  ngOnInit(): void {
  }

}
