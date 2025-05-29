import { AbsenceDashboardDto } from '../models/dto/absenceDashboardDto';

export const FAKE_ABSENCES: AbsenceDashboardDto[] = [
  {
    id: 1,
    photo: "",
    nom: 'Sydney ITIERE',
    matricule: 'ISM123',
    classe: 'L3-GLRS',
    date: new Date ('2025-05-24'),
    cours: 'Algorithme',
    status: 'Justifie',
    justificationId: 1,
    isJustified: false,
    piecejointeUrl: '',
  },
  {
    id: 2,
    photo: "",
    nom: 'Diarra FALL',
    matricule: 'ISM124',
    classe: 'L3-GLRS',
    date: new Date ('2025-05-25'),
    cours: 'Flutter',
    status: 'Non-justifie',
    justificationId: 0,
    isJustified: true,
    piecejointeUrl: '',
  },
  {
    id: 3,
    photo: "",
    nom: 'Patrick POATHY',
    matricule: 'ISM125',
    classe: 'L3-GLRS',
    date: new Date ('2025-05-24'),
    cours: 'SGBD',
    status: 'Justifie',
    justificationId: 1,
    isJustified: false,
    piecejointeUrl: '',
  }
];