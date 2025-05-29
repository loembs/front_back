import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginComponent} from './pages/security/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SecurityComponent} from './pages/security/security.component';
import {AdminComponent} from './pages/admin/admin.component';

import {PageDashboardAbsenceComponent} from './pages/dashboard/page-dashboard-absence/page-dashboard-absence.component';
import {PageDashboardJustificationComponent} from './pages/dashboard/page-dashboard-justification/page-dashboard-justification.component';
import {PageValidationJustificationComponent} from './pages/dashboard/page-validation-justification/page-validation-justification.component';



export const routes: Routes = [
  {
    path:"dasboard",
    component: DashboardComponent,
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
        path: "validation/:justification_id",
        component: PageValidationJustificationComponent
      },

    ]
  },
  {
    path: "security",
    component: SecurityComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
     
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full' // Reload
  },
  // Page not found
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
