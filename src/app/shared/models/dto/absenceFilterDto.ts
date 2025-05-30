export interface AbsenceFilterDto {
    batiment: 'Ingenieur' | 'Management' | 'Madiba ' | 'Droit';
    date: Date;
    status: 'Justifie' | 'Non-Justifie' | 'En-attente';
}