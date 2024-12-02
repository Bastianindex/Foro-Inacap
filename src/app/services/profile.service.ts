import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // Importación de Subject de RxJS para manejo de eventos

@Injectable({
  providedIn: 'root' // Configuración para que el servicio esté disponible en toda la aplicación
})
export class ProfileService {
  private profileUpdatedSource = new Subject<any>(); // Creación de un Subject para emitir eventos de actualización de perfil
  profileUpdated$ = this.profileUpdatedSource.asObservable(); // Conversión del Subject a un Observable para suscripciones

  updateProfile(user: any) {
    this.profileUpdatedSource.next(user); // Emisión de un evento de actualización de perfil con los datos del usuario
  }
}
