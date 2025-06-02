import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AppStore } from '../store/app.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(AppStore);

  const currentUser = store.currentUser();
  const token = localStorage.getItem('token');

  if (!token || !currentUser) {
    router.navigate(['/security/login']);
    return false;
  }

  if (state.url.includes('/admin') && currentUser.role !== 'ADMIN') {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
}; 