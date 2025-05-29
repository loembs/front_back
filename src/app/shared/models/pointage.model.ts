import { Utilisateur } from './utilisateur.model';
import { Etudiant } from './etudiant.model';
import { EnumPointer } from './enum-pointer.model';
import { SeanceCours } from './seance-cours.model';

export interface Pointage {
  id: number;
  date: string; // Or Date type
  heureDbP: string; // Or string/Date type for time
  heureFinP: string; // Or string/Date type for time
  utilisateur: Utilisateur; // Assuming the user who did the pointing
  etudiant: Etudiant; // The student being pointed
  pointerStatus: EnumPointer;
  seanceCours: SeanceCours; // The course session being pointed
} 