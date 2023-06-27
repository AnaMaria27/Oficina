import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from './services/database.services';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './credentials';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(() =>{
    if(environment.useEmulators) {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore);
      return firestore;
    } else {
      return getFirestore();
    }
  })],
  providers: [FormBuilder,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatabaseService, DatePicker],
  bootstrap: [AppComponent],
})
export class AppModule {}
