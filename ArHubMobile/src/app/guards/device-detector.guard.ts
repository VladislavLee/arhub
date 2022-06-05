import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorGuard implements CanActivate {
  constructor(private _router: Router, private deviceService: DeviceDetectorService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const isMobile = this.deviceService.isMobile();
    const currentRoute = route.routeConfig?.path;

    switch (currentRoute) {
      case 'news':
        if (!isMobile) {
          this._router.navigate(['/news'])
        }
        break;
      case 'news-desktop':
        if (isMobile) {
          this._router.navigate(['/news']);
        }
        break;
      case 'my-post':
        if (isMobile) {
          this._router.navigate(['/my-post-mobile']);
        }
        break;
      case 'my-post-mobile':
        if (!isMobile) {
          this._router.navigate(['/my-post']);
        }
        break;
      case 'account':
        if (!isMobile) {
          this._router.navigate(['/account-mobile']);
        }
        break;
      case 'account-mobile':
        if (isMobile) {
          this._router.navigate(['/account']);
        }
        break;
    }

    return true;
  }
}
