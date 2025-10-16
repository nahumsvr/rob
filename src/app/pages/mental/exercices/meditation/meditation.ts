import { Component, inject } from '@angular/core';
import { Coins } from '../../../../services/coins';

@Component({
  selector: 'app-meditation',
  imports: [],
  templateUrl: './meditation.html',
  styleUrl: './meditation.scss'
})
export class Meditation {
  coinsService = inject(Coins);

}
