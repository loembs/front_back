import { EnumJustification } from './enum-justification.model';

export interface Justification {
  id: number;
  titre: string;
  motif: string;
  pieceJoint: string; 
  justificationStatus: EnumJustification;
} 