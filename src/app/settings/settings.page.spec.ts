import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsPage } from './settings.page';

// Esta función describe describe el comportamiento de la página de configuración
describe('SettingsPage', () => {
  let component: SettingsPage; // Componente a probar
  let fixture: ComponentFixture<SettingsPage>; // Fixture para crear el componente

  // Se ejecuta antes de cada prueba para configurar el entorno de prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPage); // Crea el componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detección de cambios para inicializar el componente
  });

  // Prueba para verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Espera que el componente sea verdadero, es decir, que se haya creado correctamente
  });
});
