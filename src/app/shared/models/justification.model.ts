import { EnumJustification } from './enum-justification.model';

export interface Justification {
  id: number;
  titre: string;
  motif: string;
  pieceJoint: string; // Assuming path or URL to the attached file
  justificationStatus: EnumJustification;
} 