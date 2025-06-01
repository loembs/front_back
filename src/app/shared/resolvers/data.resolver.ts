import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppStore } from '../store/app.store';
import { Justification, JustificationStatus } from '../store/app.store'; // Importer JustificationStatus

export const justificationResolver: ResolveFn<Justification> = async (route, state) => {
  const store = inject(AppStore);

  try {
    store.setLoading(true);
    const justificationId = route.paramMap.get('justification_id');
    const fakeJustifications: Justification[] = [
      {
        id: 1,
        photo: '',
        nom: 'Étudiant Test 1',
        matricule: 'E123',
        classe: 'L3 Info',
        date: '2023-10-26',
        cours: 'Angular',
        status: 'EN_ATTENTE',
        motif: 'Cause maladie'
      },
      {
        id: 2,
        photo: '',
        nom: 'Étudiant Test 2',
        matricule: 'E456',
        classe: 'L3 Info',
        date: '2023-10-25',
        cours: 'Java',
        status: 'VALIDEE',
        motif: 'Rendez-vous'
      },
      {
        id: 3,
        photo: '',
        nom: 'Étudiant Test 3',
        matricule: 'E789',
        classe: 'L3 Info',
        date: '2023-10-26',
        cours: 'PHP',
        status: 'VALIDEE',
        motif: 'Urgence familiale'
      },
      {
        id: 4,
        photo: '',
        nom: 'Étudiant Test 4',
        matricule: 'E987',
        classe: 'L3 Info',
        date: '2023-10-24',
        cours: 'Python',
        status: 'EN_ATTENTE',
        motif: 'Problème de transport'
      },
      {
        id: 5,
        photo: '',
        nom: 'Étudiant Test 5',
        matricule: 'E987',
        classe: 'L3 Info',
        date: '2023-10-24',
        cours: 'Python',
        status: 'REFUSEE',
        motif: 'En retard'
      }
    ];

    const justification = fakeJustifications.find(j => j.id === Number(justificationId));

    if (!justification) {
        throw new Error('Justification non trouvée');
    }

    

    return justification;
  } catch (error) {
    store.setError('Erreur lors du chargement de la justification');
    throw error;
  } finally {
    store.setLoading(false);
  }
}; 