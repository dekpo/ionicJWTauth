import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { Storage, IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';

export function jwtOptionsFactory(storage){
  return {
    tokenGetter: () =>{
      return storage.get('access_token')
    },
    allowedDomains: ['localhost:3000']
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, IonicStorageModule.forRoot() , BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
