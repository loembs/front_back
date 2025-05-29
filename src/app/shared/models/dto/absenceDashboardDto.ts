export interface AbsenceDashboardDto {
    id: number;
    photo: string;
    nom: string;
    matricule: string;
    classe: string;
    date: Date;
    cours: string;
    status: 'Justifie' | 'Non-justifie';
    justificationId?: number;
    isJustified: boolean;
    piecejointeUrl? : string;
}