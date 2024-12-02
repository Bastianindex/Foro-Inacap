import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  settings = {
    notifications: true,
    darkMode: false,
    language: 'es',
  };

  constructor(private platform: Platform) {
    this.loadSettings(); // Llamada al método para cargar las configuraciones al inicializar la página
  }

  loadSettings() {
    // Este método carga las configuraciones actuales desde el almacenamiento local, si no hay configuraciones, se establecen los valores predeterminados.
    const darkMode = localStorage.getItem('darkMode') === 'true'; // Se verifica si el modo oscuro está activado en el almacenamiento local
    this.settings.darkMode = darkMode; // Se asigna el valor de darkMode a las configuraciones
    this.applyTheme(darkMode); // Se aplica el tema según el valor de darkMode
  }

  saveSettings() {
    // Este método guarda las configuraciones actuales en el almacenamiento local.
    localStorage.setItem('darkMode', this.settings.darkMode.toString()); // Se guarda el valor de darkMode como una cadena en el almacenamiento local
    this.applyTheme(this.settings.darkMode); // Se aplica el tema según el valor de darkMode
  }

  applyTheme(isDark: boolean) {
    // Este método aplica o quita el tema oscuro según el parámetro isDark.
    const body = document.body; // Se obtiene el elemento body del documento
    if (isDark) {
      body.classList.add('dark-theme'); // Si isDark es verdadero, se agrega la clase 'dark-theme' al body
    } else {
      body.classList.remove('dark-theme'); // Si isDark es falso, se quita la clase 'dark-theme' del body
    }
  }
}
