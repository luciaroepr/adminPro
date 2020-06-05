import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'account-settings', component: AccountSettingsComponent },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil usuario'} },
            // mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuario'} },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
