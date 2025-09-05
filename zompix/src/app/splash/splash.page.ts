import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SplashPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000);
    //segundos del inicio del splash
  }
}
