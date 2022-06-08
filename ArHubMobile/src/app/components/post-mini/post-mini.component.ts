import {Component, Input, OnInit} from '@angular/core';
import {API_URL_DATASTORE} from "../../../URL_LIST";

@Component({
  selector: 'app-post-mini',
  templateUrl: './post-mini.component.html',
  styleUrls: ['./post-mini.component.scss'],
})
export class PostMiniComponent implements OnInit {
  @Input() postMini: any;
  readonly apiUrlDatastore =  API_URL_DATASTORE;
  constructor() { }

  ngOnInit(): void {
  }

}
