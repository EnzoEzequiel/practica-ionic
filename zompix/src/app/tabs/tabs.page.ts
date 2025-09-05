import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

  constructor(private router: Router) {}

  logout() {
    this.supabase.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
