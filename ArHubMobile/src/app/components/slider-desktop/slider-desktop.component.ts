import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-slider-desktop',
  templateUrl: './slider-desktop.component.html',
  styleUrls: ['./slider-desktop.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderDesktopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
