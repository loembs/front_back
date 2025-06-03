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
        images: '',
        nomEtudiant: 'Étudiant Test 1',
        matricule: 'E123',
        nomClasse: 'L3 Info',
        date: '2023-10-26',
        nomModule: 'Angular',
        enumJustifiaction: 'EN_ATTENTE',
        motif: 'Cause maladie'
      },
      {
        id: 2,
        images: '',
        nomEtudiant: 'Étudiant Test 2',
        matricule: 'E456',
        nomClasse: 'L3 Info',
        date: '2023-10-25',
        nomModule: 'Java',
        enumJustifiaction: 'VALIDEE',
        motif: 'Rendez-vous'
      },
      {
        id: 3,
        images: '',
        nomEtudiant: 'Étudiant Test 3',
        matricule: 'E789',
        nomClasse: 'L3 Info',
        date: '2023-10-26',
        nomModule: 'PHP',
        enumJustifiaction: 'VALIDEE',
        motif: 'Urgence familiale'
      },
      {
        id: 4,
        images: '',
        nomEtudiant: 'Étudiant Test 4',
        matricule: 'E987',
        nomClasse: 'L3 Info',
        date: '2023-10-24',
        nomModule: 'Python',
        enumJustifiaction: 'EN_ATTENTE',
        motif: 'Problème de transport'
      },
      {
        id: 5,
        images: '',
        nomEtudiant: 'Étudiant Test 5',
        matricule: 'E987',
        nomClasse: 'L3 Info',
        date: '2023-10-24',
        nomModule: 'Python',
        enumJustifiaction: 'REFUSEE',
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