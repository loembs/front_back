import { EnumJustification } from './enum-justification.model';

export interface Justification {
    id: string;
    date: Date;
    nomEtudiant: string;
    nomModule: string;
    matricule: string;
    nomClasse: string;
    image: string;
    pieceJointe: string[];
    statutJustification: 'EnCours' | 'Valider' | 'Rejeter';
    motif: string;
}
