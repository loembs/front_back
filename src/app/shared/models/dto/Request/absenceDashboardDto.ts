export interface AbsenceDashboardDto {
    id: number;
    image: string;
    nomEtudiant: string;
    matricule: string;
    nomClasse: string;
    date: Date;
    nomModule: string;
    etatAbsence: 'JUSTIFIE' | 'NON-JUSTIFIE';
    justificationId?: number;
    heureDb:string;
    heureFin:string;
}