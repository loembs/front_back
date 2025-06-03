export interface Justification {
  id: string;
  date: string;
  nomEtudiant: string;
  nomModule: string;
  matricule: string;
  nomClasse: string;
  images: string;
  etatAbsence: string;
  motif?: string;
  status?: string;
}

export interface JustificationPost {
  id: string;
  titre: string;
  motif: string;
  pieceJointe: string;
} 