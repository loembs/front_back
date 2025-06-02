import { Classe } from "./classe.model";

export interface Filiere {
  id: number;
  libelle: string;
  listClasse: Classe[]; // Assuming list of Classe, refine type later
} 