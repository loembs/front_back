import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppStore } from '../store/app.store';
import { Justification } from '../store/app.store';
import { Router } from '@angular/router';

export const justificationResolver: ResolveFn<Justification> = async (route, state) => {
  const store = inject(AppStore);
  const router = inject(Router);

  try {
    store.setLoading(true);
    
    // Récupérer la justification depuis le state de navigation
    const navigation = router.getCurrentNavigation();
    const justification = navigation?.extras?.state?.['justification'];

    if (!justification) {
      throw new Error('Justification non trouvée dans le state de navigation');
    }

    return justification;
  } catch (error) {
    store.setError('Erreur lors du chargement de la justification');
    throw error;
  } finally {
    store.setLoading(false);
  }
}; 