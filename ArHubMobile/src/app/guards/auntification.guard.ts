import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class AuntificationGuard implements CanActivate {
  constructor(private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const isLogin = window.localStorage.getItem('login');

    console.log(isLogin)

    if (!isLogin) {
      console.log('qwe')
      this._router.navigate(['/login'])
      return false;
    } else {
      return true;
    }
  }
}
