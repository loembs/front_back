export interface AnneeScolaire {
  id: number;
  libelle: string;
  listCours: any[]; // Assuming list of Cours, refine type later
} 