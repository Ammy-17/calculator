import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

/**
 * Rutas principales del sistema (no contiene rutas hijas).
 */
export const routes: Routes = [
    {
        title: "Inicio",
        component: HomeComponent,
        path: "home"
    },
    {
        title: "Historial",
        component: HistoryComponent,
        path: "history"
    }
];
