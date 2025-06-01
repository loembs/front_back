export interface JustificationDashboardDto {
    id: number;
    photo: string;
    nom: string;
    matricule: string;
    classe: string;
    date: Date;
    cours: string;
    motif:string;
    status: 'En-attente' | 'Validee' | 'Refusee';
    pieceJointeUrl: string,
}