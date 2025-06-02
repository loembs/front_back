import { Cours } from "./cours.model";

export interface Module {
  id: number;
  nom: string;
  listCours: Cours[]; // Assuming list of Cours, refine type later
} 