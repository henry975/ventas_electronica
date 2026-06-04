import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SplashPage implements OnInit, OnDestroy {
  private timeoutId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 5000);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}