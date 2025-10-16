import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-work',
  imports: [CommonModule, FormsModule],
  templateUrl: './work.html',
  styleUrl: './work.scss'
})
export class Work {
  hours: number | null = null;
  minutes: number | null = null;
  isRunning = false;
  totalSeconds = 0;
  remainingSeconds = 0;
  coins = 0;
  showSession = false;
  editingTime = false;
  tempHours: number | null = null;
  tempMinutes: number | null = null;

  circumference = 2 * Math.PI * 90;
  strokeDashoffset = 0;

  private timerSubscription: Subscription | null = null;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  handleStart(): void {
    const h = this.hours || 0;
    const m = this.minutes || 0;
    const total = h * 3600 + m * 60;

    if (total > 0) {
      this.totalSeconds = total;
      this.remainingSeconds = total;
      this.showSession = true;
      this.isRunning = true;
      this.startTimer();
    }
  }

  private startTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.isRunning && this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateProgress();

        if (this.remainingSeconds === 0) {
          this.isRunning = false;
        }
      }
    });
  }

  private updateProgress(): void {
    const progress = this.totalSeconds > 0
      ? (this.totalSeconds - this.remainingSeconds) / this.totalSeconds
      : 0;
    this.strokeDashoffset = this.circumference * progress;
  }

  handlePause(): void {
    this.isRunning = !this.isRunning;
  }

  handleFinish(): void {
    const earnedCoins = Math.floor(this.totalSeconds / 180);
    this.coins = earnedCoins;
    this.resetSession();
  }

  handleCancel(): void {
    this.resetSession();
  }

  private resetSession(): void {
    this.showSession = false;
    this.isRunning = false;
    this.hours = null;
    this.minutes = null;
    this.totalSeconds = 0;
    this.remainingSeconds = 0;
    this.editingTime = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startEditingTime(): void {
    const h = Math.floor(this.remainingSeconds / 3600);
    const m = Math.floor((this.remainingSeconds % 3600) / 60);
    this.tempHours = h;
    this.tempMinutes = m;
    this.editingTime = true;
    this.isRunning = false;
  }

  saveEditTime(): void {
    const h = this.tempHours || 0;
    const m = this.tempMinutes || 0;
    const total = h * 3600 + m * 60;

    if (total >= 0) {
      this.remainingSeconds = total;
      this.totalSeconds = total;
      this.updateProgress();
      this.editingTime = false;
    }
  }

  cancelEditTime(): void {
    this.editingTime = false;
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  calculateCoins(): number {
    return Math.floor((this.totalSeconds - this.remainingSeconds) / 180);
  }
}
