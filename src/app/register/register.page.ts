/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  passwordMismatch = false; // Variable para indicar si las contraseñas no coinciden
  registerForm: FormGroup; // Formulario de registro
  showPassword: boolean = false; // Para mostrar/ocultar la contraseña
  showConfirmPassword: boolean = false; // Para mostrar/ocultar la confirmación de contraseña

  constructor(private router: Router, private afAuth: AngularFireAuth, private fb: FormBuilder) {
    // Creación del formulario de registro con validaciones
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async register() {
    // Reinicia la variable de coincidencia de contraseñas
    this.passwordMismatch = false;

    // Verifica si el formulario es inválido
    if (this.registerForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Obtener los valores del formulario
    const { email, password, confirmPassword } = this.registerForm.value;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      this.passwordMismatch = true; // Si no coinciden, marca como verdadero
      return;
    }

    // Intentar registrar el usuario
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      alert('Registro exitoso. Ahora puede iniciar sesión.');
      this.router.navigate(['/login']); // Redirigir al login después del registro
    } catch (error: any) {
      // Manejo de errores de registro
      let errorMessage = 'Error al registrar el usuario';
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'El correo electrónico ya está en uso.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Operación no permitida.';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil.';
            break;
        }
      }
      alert(errorMessage);
    }
  }

  toggleShowPassword() {
    // Cambia el estado de mostrar/ocultar la contraseña
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    // Cambia el estado de mostrar/ocultar la confirmación de contraseña
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
