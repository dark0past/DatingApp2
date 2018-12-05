import { AuthService } from './../_services/auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    
    constructor(private userService: UserService, private router: Router, 
                private authService: AuthService, private alertify: AlertifyService) {}

    // resolve automaticly subscribe to methods. but we need to catch errors.
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError( error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}