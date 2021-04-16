import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private authService: AuthService,
    private storage: Storage
  ) { }

  specialData = '';

  getSpecialInfo(){
    this.authService.getSpecialData().subscribe( res =>{
      this.specialData = res['msg'];
    })
  }
  
  logout(){
    this.authService.logout();
  }

  clearToken(){
    // pour tester...
    this.storage.remove('access_token');
  }

  ngOnInit() {
  }

}
