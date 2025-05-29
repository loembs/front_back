import { Personne } from './personne.model';
import { Classe } from './classe.model';
import { Pointage } from './pointage.model';
export interface Etudiant extends Personne {
  matricule: string;
  classe: Classe; 
  listPointage: Pointage[]; 
} 