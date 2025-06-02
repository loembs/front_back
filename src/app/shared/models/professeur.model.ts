import { Personne } from './personne.model';

export interface Professeur extends Personne {
  specialite: string;
  grade: string;
  listCours: any[]; // Assuming list of Cours, refine type later
} 