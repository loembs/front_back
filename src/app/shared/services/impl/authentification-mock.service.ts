import {Injectable, signal} from '@angular/core';
import {LoginResponse, Role, Utilisateur} from '../../models/utilisateur.model';
import {IAuthentification} from '../IAuthentification.service';
import {Observable, of} from 'rxjs';
import {MOCK_USER} from '../../mock/user.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationMockService {

}
 

 
