import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-mini',
  templateUrl: './post-mini.component.html',
  styleUrls: ['./post-mini.component.scss'],
})
export class PostMiniComponent implements OnInit {
  @Input() postMini: any;
  constructor() { }

  ngOnInit(): void {
  }

}
