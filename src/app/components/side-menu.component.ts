import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnDestroy {
  username: string = 'Usuario';
  private authSubscription: Subscription;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.username = user.displayName || 'Usuario';
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
