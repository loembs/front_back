import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SecurityComponent} from './pages/security/security.component';
import {AdminComponent} from './pages/admin/admin.component';
import {PageDashboardAbsenceComponent} from './pages/dashboard/page-dashboard-absence/page-dashboard-absence.component';
import {PageDashboardJustificationComponent} from './pages/dashboard/page-dashboard-justification/page-dashboard-justification.component';
import {PageValidationJustificationComponent} from './pages/dashboard/page-validation-justification/page-validation-justification.component';
import { authGuard } from './shared/guards/auth.guard';
import { ConnexionPageComponent } from './pages/admin/connexion-page/connexion-page.component';
import { PageDashboardDetailAbsenceComponent } from './pages/dashboard/page-dashboard-detail-absence/page-dashboard-detail-absence.component';

export const routes: Routes = [
  {
    path:"dashboard",
    component: DashboardComponent,
    //canActivate: [authGuard],
    children:[
      {
        path: 'absences',
        component: PageDashboardAbsenceComponent
      },
      {
        path: 'justifications',
        component: PageDashboardJustificationComponent
      },
      {
        path: "validation",
        component: PageValidationJustificationComponent
      },
      {
        path: 'detail-absence',
        component: PageDashboardDetailAbsenceComponent
      }
    ]
  },
  {
    path: "security",
    component: SecurityComponent,
    children: [
      {
        path: 'login',
        component: ConnexionPageComponent
      }
    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authGuard],
    children: []
  },
  {
    path: '',
    redirectTo: '/security/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];