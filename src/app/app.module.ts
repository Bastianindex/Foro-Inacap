import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat"; // Corregido
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

/**
 * AppModule es el módulo raíz de la aplicación.
 * Inicializa el AppComponent y importa los módulos necesarios.
 */
@NgModule({
  declarations: [
    /**
     * AppComponent se declara como parte de este módulo.
     */
    AppComponent
  ],
  imports: [
    /*BrowserModule es necesario para ejecutar la aplicación en un navegador*/
    BrowserModule,
    /* IonicModule se inicializa con la configuración predeterminada.*/
    IonicModule.forRoot(),
    /*AppRoutingModule maneja la configuración de enrutamiento.*/
    AppRoutingModule,
    /*AngularFireModule se inicializa con la configuración de Firebase.*/
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    /*AngularFireAuthModule proporciona servicios de autenticación de Firebase.*/
    AngularFireAuthModule,
    /*AngularFirestoreModule proporciona servicios de base de datos Firestore. */
    AngularFirestoreModule
  ],
  providers: [
    /*RouteReuseStrategy se proporciona para manejar la estrategia de reutilización de rutas.*/
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    /*AppComponent se inicializa para lanzar la aplicación.*/
    AppComponent
  ],
})
export class AppModule {}
