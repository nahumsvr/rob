import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="phone-container">
        <main>
            <h1 id="phase-title">{{ phaseTitle() }}</h1>

            <!-- Pantalla de Inicio -->
            @if (screen() === 'start') {
              <div id="start-screen">
                  <button id="start-btn" (click)="startExercise()">{{ startButtonText() }}</button>
              </div>
            }

            <!-- Pantalla del Temporizador -->
            @if (screen() === 'timer') {
              <div id="timer-display">
                  <svg viewBox="0 0 200 200">
                      <circle class="progress-ring__circle-bg" r="90" cx="100" cy="100" />
                      <circle
                        id="progress-circle"
                        class="progress-ring__circle"
                        r="90"
                        cx="100"
                        cy="100"
                        [style.stroke]="currentPhase().color"
                        [style.stroke-dasharray]="circumference"
                        [style.stroke-dashoffset]="progressOffset()"
                      />
                  </svg>
                  <span id="timer-text">{{ timerText() }}</span>
              </div>
              <div id="repetition-counter">{{ repetitionText() }}</div>
            } @else {
              <!-- Esto se muestra si la pantalla no es 'start'. Sirve como placeholder para el timer -->
              <div id="timer-display" class="hidden"></div>
              <div id="repetition-counter" class="hidden"></div>
            }
        </main>
    </div>
  `,
  styles: `
    /* --- Reset Básico y Estilos Globales --- */
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* --- Contenedor Principal (Simula Teléfono) --- */
    .phone-container {
        width: 100%;
        max-width: 24rem; /* max-w-sm */
        height: 85vh;
        max-height: 750px;
        background-color: #1C1C1E;
        border-radius: 40px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
        padding: 1rem; /* p-4 */
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: #ffffff;
        margin: auto; /* Centra el contenedor en la página */
    }

    /* --- Contenido Principal de la App --- */
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem; /* gap-6 */
        text-align: center;
        padding: 0 1rem; /* px-4 */
    }

    /* --- Elementos de la UI --- */
    #phase-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: 700; /* font-bold */
        color: #E5E7EB; /* text-gray-200 */
        height: 4rem; /* h-16 */
    }

    #start-screen {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem; /* gap-4 */
        flex: 1;
    }

    #start-btn {
        width: 100%;
        max-width: 20rem; /* max-w-xs */
        background-color: #AEFF2D;
        color: #0F4D09;
        font-weight: 700; /* font-bold */
        padding: 1rem 1.5rem; /* py-4 px-6 */
        border-radius: 9999px; /* rounded-full */
        font-size: 1.25rem; /* text-xl */
        border: none;
        cursor: pointer;
        transition: transform 0.15s ease-out;
    }

    #start-btn:active {
        transform: scale(0.95); /* active:scale-95 */
    }

    #timer-display {
        position: relative;
        width: 16rem; /* w-64 */
        height: 16rem; /* h-64 */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        margin: 2rem 0; /* my-8 */
    }

    #timer-display svg {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
    }

    .progress-ring__circle-bg {
        stroke: #3A3A3C;
        stroke-width: 12;
        fill: transparent;
    }

    .progress-ring__circle {
        stroke: #6EE7B7;
        stroke-linecap: round;
        stroke-width: 12;
        fill: transparent;
        transition: stroke-dashoffset 1s linear, stroke 0.5s ease;
    }

    #timer-text {
        font-size: 3.75rem; /* text-6xl */
        font-weight: 300; /* font-light */
        letter-spacing: 0.05em; /* tracking-wider */
    }

    #repetition-counter {
        font-size: 1.125rem; /* text-lg */
        color: #9CA3AF; /* text-gray-400 */
        height: 2rem; /* h-8 */
    }

    .hidden {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreathingExercise {
  // --- Configuración del Ejercicio ---
  private readonly phases = [
    { duration: 7, text: 'Inhala profundo...', color: '#6EE7B7' },
    { duration: 4, text: 'Sostén el aire...', color: '#FCD34D' },
    { duration: 8, text: 'Exhala lentamente...', color: '#FCA5A5' },
  ];
  private readonly MAX_REPETITIONS = 10;

  // --- Configuración del Círculo de Progreso ---
  readonly radius = 90;
  readonly circumference = 2 * Math.PI * this.radius;

  // --- Estado de la Aplicación con Signals ---
  screen = signal<'start' | 'timer'>('start');
  repetitionCount = signal(0);
  currentPhaseIndex = signal(0);
  timerSeconds = signal(0);
  private intervalId: any = null;

  // --- Signals Computadas para la Vista (UI) ---
  currentPhase = computed(() => this.phases[this.currentPhaseIndex()]);

  phaseTitle = computed(() => {
    if (this.screen() === 'timer') {
      return this.currentPhase().text;
    }
    return 'Ejercicio de Respiración';
  });

  startButtonText = computed(() => this.repetitionCount() >= this.MAX_REPETITIONS ? '¡Excelente! Repetir' : 'Comenzar');

  timerText = computed(() => this.timerSeconds().toString().padStart(2, '0'));

  repetitionText = computed(() => `Repetición ${this.repetitionCount() + 1} de ${this.MAX_REPETITIONS}`);

  progressOffset = computed(() => {
    const duration = this.currentPhase().duration;
    const progress = duration === 0 ? 0 : this.timerSeconds() / duration;
    return this.circumference * (1 - progress);
  });

  // --- Métodos de Control ---
  startExercise(): void {
    this.repetitionCount.set(0);
    this.currentPhaseIndex.set(0);
    this.screen.set('timer');
    this.runNextPhase();
  }

  private runNextPhase(): void {
    if (this.repetitionCount() >= this.MAX_REPETITIONS) {
      this.screen.set('start');
      return;
    }

    const phase = this.currentPhase();
    this.timerSeconds.set(phase.duration);

    this.intervalId = setInterval(() => {
      this.timerSeconds.update(s => s - 1);
      if (this.timerSeconds() < 0) {
        this.handlePhaseFinish();
      }
    }, 1000);
  }

  private handlePhaseFinish(): void {
    clearInterval(this.intervalId);

    if (this.currentPhaseIndex() + 1 >= this.phases.length) {
      this.currentPhaseIndex.set(0);
      this.repetitionCount.update(r => r + 1);
    } else {
      this.currentPhaseIndex.update(i => i + 1);
    }

    this.runNextPhase();
  }
}

