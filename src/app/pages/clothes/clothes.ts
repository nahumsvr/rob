import { Component, inject } from '@angular/core';
import { Coins } from '../../services/coins';

@Component({
  selector: 'app-clothes',
  imports: [],
  templateUrl: './clothes.html',
  styleUrl: './clothes.scss'
})
export class Clothes {
  coinsService = inject(Coins);
}
