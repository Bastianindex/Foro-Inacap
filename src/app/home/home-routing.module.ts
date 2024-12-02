import { NgModule } from '@angular/core'; // Importa el decorador NgModule de Angular Core
import { RouterModule, Routes } from '@angular/router'; // Importa el módulo RouterModule y la clase Routes de Angular Router
import { HomePage } from './home.page'; // Importa el componente HomePage

// Define las rutas para el módulo HomePage
const routes: Routes = [
  {
    path: '', // Ruta raíz del módulo
    component: HomePage // Componente asociado a la ruta raíz
  }
];

// Define el módulo HomePageRoutingModule
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa el módulo RouterModule para este módulo, pasando las rutas definidas
  exports: [RouterModule] // Exporta el módulo RouterModule para que pueda ser utilizado en otros módulos
})
export class HomePageRoutingModule {}
