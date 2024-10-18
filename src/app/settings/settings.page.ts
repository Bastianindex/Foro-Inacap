import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  settings = {
    notifications: false,
    darkMode: false,
    language: 'es'
  };

  constructor(private storage: Storage) {
    this.loadSettings();
  }

  async loadSettings() {
    const storedSettings = await this.storage.get('settings');
    if (storedSettings) {
      this.settings = storedSettings;
    }
  }

  async saveSettings() {
    await this.storage.set('settings', this.settings);
  }
}
