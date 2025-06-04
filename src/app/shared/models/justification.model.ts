import { EnumJustification } from './enum-justification.model';

export interface Justification {
   id: number;
    images: string;
    nomEtudiant: string;
    matricule: string;
    nomClasse: string;
    date: Date;
    nomModule: string;
    motif:string;
    enumJustification: 'En-attente' | 'Validee' | 'Refusee';
    pieceJointeUrl: string,
} 