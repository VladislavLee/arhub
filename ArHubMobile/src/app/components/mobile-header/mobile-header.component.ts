import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {
  userName: any;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('login');
  }

  logout(){
    window.localStorage.removeItem('login')
    this._router.navigate(['/login'])
    console.log("logout")
  }
}
