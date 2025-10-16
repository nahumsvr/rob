import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { Timer } from '../../services/timer';

@Component({
  selector: 'app-work',
  imports: [CommonModule, FormsModule],
  templateUrl: './work.html',
  styleUrl: './work.scss'
})
export class Work {
  timerService = inject(Timer);
  // --- Inputs locales para el formulario ---
  inputHours: number = 0;
  inputMinutes: number = 1;

  // --- Configuración del Círculo ---
  readonly radius: number = 90;
  readonly circumference: number = 2 * Math.PI * this.radius;

  // --- Signals Computadas para la Vista ---
  // Calcula el offset del círculo basado en el progreso del servicio
  readonly strokeOffset = computed(() => {
    const progress = this.timerService.progress(); // Obtenemos el progreso (1 a 0)
    return this.circumference * (1 - progress);
  });

  // Formatea el tiempo para mostrarlo en pantalla
  readonly displayTime = computed(() => {
    const state = this.timerService.state();
    const hours = state.hours.toString().padStart(2, '0');
    const minutes = state.minutes.toString().padStart(2, '0');
    const seconds = state.seconds.toString().padStart(2, '0');
    // Si quieres mostrar horas, puedes añadirlas aquí
    if(hours == '00') {
      return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  });

  // --- Métodos que interactúan con el servicio ---

  // Método para establecer el tiempo inicial desde los inputs
  setTimer(): void {
    this.timerService.setTime(this.inputHours, this.inputMinutes);
  }

  constructor() {
    // Establece un tiempo inicial al cargar el componente
    this.setTimer();
  }
}

