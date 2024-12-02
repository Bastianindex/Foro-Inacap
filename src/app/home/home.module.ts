import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
// Importa el módulo SideMenuModule para utilizar el componente SideMenuComponent en este módulo
import { SideMenuModule } from '../components/side-menu.module';

// Define el módulo HomePageModule
@NgModule({
  imports: [
    CommonModule, // Importa el módulo CommonModule para acceder a directivas y pipes comunes
    FormsModule, // Importa el módulo FormsModule para acceder a directivas de formularios
    IonicModule, // Importa el módulo IonicModule para acceder a componentes y directivas de Ionic
    HomePageRoutingModule, // Importa el módulo HomePageRoutingModule para definir las rutas del módulo
    SideMenuModule // Importa el módulo SideMenuModule para utilizar el componente SideMenuComponent
  ],
  declarations: [HomePage] // Declara el componente HomePage como parte de este módulo
})
export class HomePageModule {}
