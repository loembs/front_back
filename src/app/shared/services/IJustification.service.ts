import { Observable } from 'rxjs';
import { Justification } from '../models/justification.model';
import { JustificationDashboardDto} from '../models/dto/Request/justificationDashboardDto';
import { JustificationFilterDto} from '../models/dto/Request/justicationFilterDto';
import { ValidateJustificationDto} from '../models/dto/Request/validateJustificationDto';
import { ActionResponseDto} from '../models/dto/Response/actionResponseDto';

export interface IJustification {
  getJustifications(filter?: JustificationFilterDto): Observable<JustificationDashboardDto[]>;
  validateJustification(justificationId: string, data: { enumJustification: string }): Observable<ActionResponseDto>;
  rejectJustification(justificationId: string, data: { enumJustification: string }): Observable<ActionResponseDto>;
  getJustificationsByStudent(studentId: number): Observable<JustificationDashboardDto[]>;
  getJustificationById(id:number):Observable<JustificationDashboardDto>;
} 
