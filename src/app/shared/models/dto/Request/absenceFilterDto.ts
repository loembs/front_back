export interface AbsenceFilterDto {
    batiment: 'Ingenieur' | 'Management' | 'Madiba ' | 'Droit';
    date: Date;
    etatAbsence: 'JUSTIFIE' | 'NON-JUSTIFIE';
}