import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router
  ) {
    this.initApp();
  }
  
  initApp(){
    this.platform.ready().then( () =>{
      this.authService.authenticationState.subscribe( (state) => {
        if (state) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/login');
        }
      });
    });
  }
}
