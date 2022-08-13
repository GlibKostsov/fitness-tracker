import { User } from './user.model';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  private user!: User | null;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private auth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
