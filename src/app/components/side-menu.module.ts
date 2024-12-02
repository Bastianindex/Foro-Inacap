import { NgModule } from '@angular/core'; // Importa el decorador NgModule de Angular Core
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule de Angular
import { IonicModule } from '@ionic/angular'; // Importa el módulo IonicModule de Ionic Angular
import { RouterModule } from '@angular/router'; // Importa el módulo RouterModule de Angular Router
import { SideMenuComponent } from './side-menu.component'; // Importa el componente SideMenuComponent

// Define el módulo SideMenuModule
@NgModule({
  imports: [
    CommonModule, // Importa el módulo CommonModule para acceder a directivas y pipes comunes
    IonicModule, // Importa el módulo IonicModule para acceder a componentes y directivas de Ionic
    RouterModule // Importa el módulo RouterModule para acceder a la funcionalidad de routing de Angular
  ],
  declarations: [SideMenuComponent], // Declara el componente SideMenuComponent como parte de este módulo
  exports: [SideMenuComponent] // Exporta el componente SideMenuComponent para que pueda ser utilizado en otros módulos
})
export class SideMenuModule { }
