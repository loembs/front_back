import { Professeur } from './professeur.model';
import { Classe } from './classe.model';
import { AnneeScolaire } from './annee-scolaire.model';
import { Module } from './module.model';
import { SeanceCours } from './seance-cours.model';

export interface Cours {
  id: number;
  nbreHeure: number;
  semestre: string;
  listSeanceCours: SeanceCours[];
  professeur: Professeur;
  classe: Classe;
  anneeScolaire: AnneeScolaire;
  module: Module;
} 