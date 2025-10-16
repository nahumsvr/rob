// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', // La ruta raíz de esta sección (ej: /dashboard)
        redirectTo: 'menu',
        pathMatch: 'full'
        // Aquí puedes agregar más rutas hijas si es necesario
    },
    {
        path: 'menu',
        loadComponent: () => import('./exercices/slect/slect').then(m => m.Slect)
    },
    {
        path: 'breathing-exercice',
        loadComponent: () => import('./exercices/breathing-exercise/breathing-exercise').then(m => m.BreathingExercise)
    },
    {
        path: 'meditation',
        loadComponent: () => import('./exercices/meditation/meditation').then(m => m.Meditation)
    }
];