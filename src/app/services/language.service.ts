import { Injectable } from '@angular/core';

// Esta clase es un servicio que se encarga de manejar el idioma actual de la aplicación.
@Injectable({
  providedIn: 'root' // Esto indica que el servicio está disponible en toda la aplicación.
})
export class LanguageService {
  // El idioma actual se inicializa en español.
  private currentLanguage = 'es';

  // Este método permite cambiar el idioma actual.
  setLanguage(language: string) {
    this.currentLanguage = language;
    // Aquí podrías guardar el idioma en el almacenamiento local o en una base de datos
  }

  // Este método devuelve el idioma actual.
  getLanguage() {
    return this.currentLanguage;
  }
}
