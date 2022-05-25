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
          this._router.navigate(['/news-desktop'])
          break;
        }
    }

    return true;
  }
}
