import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-card-mobile',
  templateUrl: './user-card-mobile.component.html',
  styleUrls: ['./user-card-mobile.component.scss']
})
export class UserCardMobileComponent implements OnInit {
  @Input() user: any

  isSubscribe = false;

  constructor() { }

  ngOnInit(): void {
  }

  subscribe() {
    this.isSubscribe = !this.isSubscribe;
  }
}
