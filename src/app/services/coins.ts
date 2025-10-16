import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Coins {
  coins = signal(35);

  addCoins(amount: number) {
    this.coins.update(current => current + amount);
  }
}
