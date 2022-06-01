import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popular-post',
  templateUrl: './popular-post.component.html',
  styleUrls: ['./popular-post.component.scss']
})
export class PopularPostComponent implements OnInit {
  @Input() post: any;

  constructor() { }

  ngOnInit(): void {
  }

}
