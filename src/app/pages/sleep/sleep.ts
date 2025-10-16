import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'sleep.html',
  styleUrl: 'sleep.scss'
})
// La clave es exportar una clase llamada 'Sleep' para que coincida con app.routes.ts
export class Sleep implements OnInit {
  public weeklySleepData = [
    { day: 'L', hours: 7.5 }, { day: 'M', hours: 5.5 },
    { day: 'M', hours: 6.8 }, { day: 'J', hours: 7.2 },
    { day: 'V', hours: 6.5 }, { day: 'S', hours: 8.0 },
    { day: 'D', hours: 7.0 },
  ];

  public bestSleepDay: string = '';
  public worstSleepDay: string = '';

  ngOnInit() {
    this.calculateSleepStats();
  }

  calculateSleepStats() {
    if (this.weeklySleepData.length === 0) return;
    const bestDay = this.weeklySleepData.reduce((p, c) => (p.hours > c.hours) ? p : c);
    const worstDay = this.weeklySleepData.reduce((p, c) => (p.hours < c.hours) ? p : c);
    this.bestSleepDay = 'Sábado';
    this.worstSleepDay = 'Martes';
  }

  getBarStyle(hours: number): { [key: string]: string } {
    const maxHeight = 8;
    const percentage = (hours / maxHeight) * 100;
    return { 'height': `${percentage}%` };
  }
}

