// slect.ts

import { Component, inject } from '@angular/core';
// ¡Importa ActivatedRoute!
import { Router, ActivatedRoute } from '@angular/router';
import { Coins } from '../../../../services/coins';

@Component({
  selector: 'app-slect',
  // Asegúrate de que tu componente sea standalone si no usas módulos
  standalone: true, 
  imports: [],
  templateUrl: './slect.html',
  styleUrl: './slect.scss'
})
export class Slect {
  router = inject(Router);
  // Inyecta la ruta activa
  route = inject(ActivatedRoute);
  coinsService = inject(Coins);

  gotTo(path: string) {
    // Navega relativamente a la ruta actual
    // this.router.navigate([path]); // <-- Antes
    this.router.navigate([path], { relativeTo: this.route.parent }); // <-- Ahora
  }
}