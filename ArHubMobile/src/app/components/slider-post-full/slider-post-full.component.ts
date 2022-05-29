import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-slider-post-full',
  templateUrl: './slider-post-full.component.html',
  styleUrls: ['./slider-post-full.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderPostFullComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
