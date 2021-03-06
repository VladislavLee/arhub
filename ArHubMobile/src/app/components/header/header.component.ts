import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMapVisible = false;
  isAdmin = window.localStorage.getItem('login') === 'admin';

  constructor(private _router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMapVisible = this.deviceService.isMobile();
  }

  createPost() {
    this._router.navigate([`/new-post`]);
  }

  logout(){
    window.localStorage.removeItem('login')
    this._router.navigate(['/login'])
    console.log("logout")
  }
}
