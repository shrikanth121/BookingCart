import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { auth } from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map'

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin)
  }

}
