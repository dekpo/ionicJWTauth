import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private alertController: AlertController) {
      this.storage.create();
      this.checkToken();
    }

    url = environment.url;
    user = null;
    authenticationState = new BehaviorSubject(false);

    checkToken(){
      this.storage.get(TOKEN_KEY).then(token => {
        if (token) {
          const decoded = this.helper.decodeToken(token);
          const isExpired = this.helper.isTokenExpired(token);
          if (!isExpired) {
            this.user = decoded;
            this.authenticationState.next(true);
          } else {
            this.storage.remove(TOKEN_KEY);
          }
        }
      });
    }

    register(credentials){
      return this.http.post(this.url+'/register', credentials).pipe(
        catchError(e=>{
          alert(e.error.msg);
          throw e;
        })
      );
    }

    login(credentials){
      return this.http.post(this.url+'/login', credentials).pipe(
        tap( res =>{
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError( e =>{
          alert(e.error.msg);
          throw e;
        })
      );
    }

    logout(){
      this.storage.remove(TOKEN_KEY).then(()=>{
        this.authenticationState.next(false);
      });
    }

    getSpecialData(){
      return this.http.get(this.url+'/admin').pipe(
        tap( res => {
          console.log(res);
        }),
        catchError(e => {
          const status = e.status;
          if (status === 401){
            alert('Not authorized for this !');
            this.logout();
          }
          throw e
        })
      );
    }

    isAuthenticated(){
      return this.authenticationState.value;
    }

}
