import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir el módulo
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule para acceder a directivas y pipes comunes
import { FormsModule } from '@angular/forms'; // Importa el módulo FormsModule para habilitar la directiva ngModel
import { IonicModule } from '@ionic/angular'; // Importa el módulo IonicModule para acceder a componentes y directivas específicas de Ionic
import { LoginPageRoutingModule } from './login-routing.module'; // Importa el módulo de rutas específico para esta página
import { LoginPage } from './login.page'; // Importa la página de inicio de sesión para ser declarada en este módulo

// Define el módulo LoginPageModule
@NgModule({
  imports: [
    CommonModule, // Importa el módulo CommonModule
    FormsModule, // Importa el módulo FormsModule
    IonicModule, // Importa el módulo IonicModule
    LoginPageRoutingModule // Importa el módulo de rutas específico para esta página
  ],
  declarations: [LoginPage] // Declara la página de inicio de sesión
})
export class LoginPageModule {}
