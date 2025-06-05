export interface AbsenceDashboardDto {
    id: number;
    images: string;
    nomEtudiant: string;
    matricule: string;
    batiment: 'Ingenieur' | 'Management' | 'Droit' | 'Madiba';
    nomClasse: string;
    date: Date;
    nomModule: string;
    etatAbsence: 'JUSTIFIE' | 'NON-JUSTIFIE';
    justificationId?: number;
}