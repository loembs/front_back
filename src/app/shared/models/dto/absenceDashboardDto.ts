export interface AbsenceDashboardDto {
    id: number;
    photo: string;
    nom: string;
    matricule: string;
    batiment: 'Ingenieur' | 'Management' | 'Droit' | 'Madiba';
    classe: string;
    date: Date;
    cours: string;
    status: 'Justifie' | 'Non-justifie' | 'En-attente';
    justificationId?: number;
}