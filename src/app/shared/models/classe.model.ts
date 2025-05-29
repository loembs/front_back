export interface Classe {
  id: number;
  libelle: string;
  listCours: any[]; // Assuming list of Cours, refine type later
  listEtudiant: any[]; // Assuming list of Etudiant, refine type later
  filiere: any; // Assuming Filiere type, refine type later
} 