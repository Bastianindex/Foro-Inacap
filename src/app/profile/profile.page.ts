import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth } from '@angular/fire/auth';
import { EmailAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user: any;
  editMode: boolean = false;
  profileForm: FormGroup;
  showPassword: boolean = false; // Para mostrar/ocultar la contraseña
  showConfirmPassword: boolean = false; // Para mostrar/ocultar la confirmación de contraseña
  @Output() profileUpdated = new EventEmitter<any>();

  constructor(private afAuth: AngularFireAuth, private router: Router, private fb: FormBuilder) {
    this.loadUserProfile();
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  async loadUserProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.user = {
        email: user.email,
        displayName: user.displayName || 'Usuario sin nombre',
        photoURL: user.photoURL || 'assets/default-avatar.png'
      };
      this.profileForm.patchValue({
        displayName: this.user.displayName,
        email: this.user.email
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async updateProfile() {
    if (this.profileForm.valid) {
      const { displayName, email, password } = this.profileForm.value;
      const user = await this.afAuth.currentUser;

      if (user && user.email) {
        try {
          await user.updateProfile({ displayName });
          if (user.email !== email) {
            const credential = EmailAuthProvider.credential(user.email, this.profileForm.value.password);
            await user.reauthenticateWithCredential(credential);
            await user.updateEmail(email);
          }
          if (password) {
            await user.updatePassword(password);
          }
          alert('Perfil actualizado con éxito');
          this.editMode = false;
          this.loadUserProfile();
        } catch (error: any) {
          console.error('Error al actualizar el perfil:', error);
          alert(`Error al actualizar el perfil: ${error.message || error}`);
        }
      } else {
        alert('No se puede actualizar el perfil: correo electrónico no disponible');
      }
    }
  }
}
