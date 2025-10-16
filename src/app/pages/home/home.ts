import { Component, DOCUMENT, Inject, inject, Renderer2 } from '@angular/core';
import { Duck } from "../../components/duck/duck";
import { Coins } from '../../services/coins';

@Component({
  selector: 'app-home',
  imports: [Duck],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  coinsService = inject(Coins);

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
    // public coinsService: CoinsService // Descomenta si usas un servicio de monedas
  ) {}

  ngOnInit(): void {
    // Cuando el componente se inicia, aplicamos el color de fondo al body.
    this.renderer.setStyle(this.document.body, 'background-color', '#50168A');
  }

  ngOnDestroy(): void {
    // Cuando el componente se destruye (al navegar a otra página),
    // quitamos el estilo para que no afecte al resto de la aplicación.
    this.renderer.removeStyle(this.document.body, 'background-color');
  }
}
