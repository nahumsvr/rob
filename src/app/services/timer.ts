import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Timer {
  // --- Estado Interno con Signals ---
  // Guardamos el estado inicial para cálculos de progreso
  private internalState = signal({
    initialTotalSeconds: 0,
    currentSeconds: 0,
    isRunning: false,
    isPaused: false,
    isFinished: true // Nuevo estado para saber si el timer ha finalizado
  });

  coins = signal({
    visible: false,
    amount: 0
  })

  // Signal para manejar el ID del intervalo y poder limpiarlo
  private intervalId = signal<any>(null);
  initialTotalSeconds = computed(() => this.internalState().initialTotalSeconds);

  // --- Signals Públicas para el Componente ---

  // Estado computado para mostrar en la UI
  public readonly state = computed(() => {
    const internal = this.internalState();
    const totalSeconds = internal.currentSeconds;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60; // El resto son los segundos

    return {
      hours,
      minutes,
      seconds,
      isRunning: internal.isRunning,
      isPaused: internal.isPaused,
      isFinished: internal.isFinished // Se expone el nuevo estado
    };
  });

  // Signal computada para el progreso de la animación (de 0 a 1)
  public readonly progress = computed(() => {
    const { currentSeconds, initialTotalSeconds } = this.internalState();
    if (initialTotalSeconds === 0) {
      return 0; // Evita división por cero
    }
    // Calcula qué porcentaje del tiempo ha transcurrido
    return currentSeconds / initialTotalSeconds;
  });

  // --- Métodos de Control ---

  public setTime(hours: number, minutes: number): void {
    this.stop(); // Detiene cualquier timer anterior antes de setear uno nuevo
    const totalSeconds = (hours * 3600) + (minutes * 60);
    this.coins.set({ visible: true, amount: Math.floor(totalSeconds / 120)});
    this.internalState.set({
      initialTotalSeconds: totalSeconds,
      currentSeconds: totalSeconds,
      isPaused: false,
      isRunning: false,
      isFinished: true // Se resetea el estado 'finished'
    });
  }

  public start(): void {
    // La nueva condición evita iniciar si ya hay un intervalo activo o el tiempo se acabó
    if (this.intervalId() || this.internalState().currentSeconds <= 0) {
      return; // No hacer nada si ya hay un contador activo o el tiempo se acabó
    }

    // isRunning se activa y isPaused se desactiva
    this.internalState.update(s => ({ ...s, isRunning: true, isPaused: false, isFinished: false }) );

    const newIntervalId = setInterval(() => {
      this.internalState.update(state => {
        const newSeconds = state.currentSeconds - 1;

        if (newSeconds < 0) {
          // Si el tiempo llega a cero, limpiamos el intervalo y actualizamos el estado
          clearInterval(this.intervalId()!);
          this.intervalId.set(null);
          return {
            ...state,
            currentSeconds: 0,
            isRunning: false,
            isPaused: false,
            isFinished: true // Marcamos como finalizado
          };
        }

        return { ...state, currentSeconds: newSeconds };
      });
    }, 1000);

    this.intervalId.set(newIntervalId);
  }

  public pause(): void {
    if (this.intervalId()) {
      clearInterval(this.intervalId());
      this.intervalId.set(null);
      // Solo se actualiza el estado de pausa, isRunning no se modifica
      this.internalState.update(s => ({ ...s, isPaused: true }) );
    }
  }

  public stop(): void { // Este método es para el botón "Terminar" o para resetear
    if (this.intervalId()) {
      clearInterval(this.intervalId());
      this.intervalId.set(null);
    }
    // Resetea el estado completamente a sus valores iniciales
    this.internalState.update(s => ({
      ...s,
      currentSeconds: s.initialTotalSeconds,
      isRunning: false,
      isPaused: false,
      isFinished: true
    }));
    this.coins.set({ visible: false, amount: 0 });
  }
}

