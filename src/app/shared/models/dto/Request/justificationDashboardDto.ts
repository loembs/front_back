export interface JustificationDashboardDto {
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