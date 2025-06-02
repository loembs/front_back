import { Cours } from './cours.model';
import { Pointage } from './pointage.model';

export interface SeanceCours {
  id: number;
  date: string; // Or Date type
  heureDb: string; // Or string/Date type for time
  heureFin: string; // Or string/Date type for time
  cours: Cours;
  listPointage: Pointage[];
} 