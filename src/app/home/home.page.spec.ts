import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa los módulos necesarios para el testing de Angular
import { IonicModule } from '@ionic/angular'; // Importa el módulo IonicModule para el testing de componentes Ionic

import { HomePage } from './home.page'; // Importa el componente HomePage para ser testado

describe('HomePage', () => { // Describe el componente HomePage para el testing
  let component: HomePage; // Variable para almacenar el componente HomePage
  let fixture: ComponentFixture<HomePage>; // Variable para almacenar el fixture del componente HomePage

  beforeEach(async () => { // Ejecuta antes de cada test
    await TestBed.configureTestingModule({
      declarations: [HomePage], // Declara el componente HomePage para el testing
      imports: [IonicModule.forRoot()] // Importa el módulo IonicModule para el testing, configurado para ser el módulo raíz
    }).compileComponents(); // Compila los componentes para el testing

    fixture = TestBed.createComponent(HomePage); // Crea un fixture del componente HomePage
    component = fixture.componentInstance; // Asigna el componente HomePage al fixture
    fixture.detectChanges(); // Detección de cambios para el fixture
  });

  it('should create', () => { // Test para verificar la creación del componente
    expect(component).toBeTruthy(); // Espera que el componente sea verdadero, es decir, que haya sido creado correctamente
  });
});
