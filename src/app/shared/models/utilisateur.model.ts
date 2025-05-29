//import { Role } from './role.model';
import { Pointage } from './pointage.model';
import { Etudiant } from './etudiant.model';
import { Professeur } from './professeur.model';

export interface Utilisateur {
  login: string;
  password?: string; // Password might not be needed in the model after authentication
  role: Role;
  listPointage: Pointage[];
  etudiant?: Etudiant; // Optional as it might be a Professeur or Admin
  professeur?: Professeur; // Optional as it might be an Etudiant or Admin
} 

export type Role = "Admin" | "Etudiant"  ;

export enum RoleEnum {
  Admin = "Admin",
  Etudiant = "Etudiant" ,
}

export interface LoginResponse {
  message: string;
  success: boolean;
  data: Utilisateur|null;
}