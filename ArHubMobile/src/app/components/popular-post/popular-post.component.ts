import {Component, Input, OnInit} from '@angular/core';
import {API_URL_DATASTORE} from "../../../URL_LIST";

@Component({
  selector: 'app-popular-post',
  templateUrl: './popular-post.component.html',
  styleUrls: ['./popular-post.component.scss']
})
export class PopularPostComponent implements OnInit {
  @Input() post: any;
  readonly apiUrlDatastore =  API_URL_DATASTORE;

  constructor() { }

  ngOnInit(): void {
  }

}
