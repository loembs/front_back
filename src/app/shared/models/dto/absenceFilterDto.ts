export interface JustificationFilterDto {
    batiment: 'Ingenieur' | 'Management' | 'Madiba ' | 'Droit';
    date: Date;
    status: 'Justifie' | 'Non-Justifie' | 'En-attente';
}