import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export type JustificationStatus = 'Valider' | 'Rejeter' | 'EnCours';

export interface Justification {
  id: string;
  image: string;
  nomEtudiant: string;
  matricule: string;
  nomClasse: string;
  date: string;
  nomModule: string;
  motif: string;
  enumJustification: JustificationStatus;
  pieceJointe: string[];
}

interface Absence {
  
}

interface AppState {
  isLoading: boolean;
  error: string | null;
  justifications: Justification[];
  absences: Absence[];
  currentUser: any | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  justifications: [],
  absences: [],
  currentUser: null
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    setError(error: string | null) {
      patchState(store, { error });
    },
    setJustifications(justifications: Justification[]) {
      patchState(store, { justifications });
    },
    setAbsences(absences: Absence[]) {
      patchState(store, { absences });
    },
    setCurrentUser(user: any) {
      patchState(store, { currentUser: user });
    },
    updateJustificationStatus(justificationId: string, status: JustificationStatus) {
      const updatedJustifications = store.justifications().map(justification => 
        justification.id === justificationId 
          ? { ...justification, status } 
          : justification
      );
      patchState(store, { justifications: updatedJustifications });
    }
  }))
); 