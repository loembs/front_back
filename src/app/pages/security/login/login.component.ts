import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {AuthentificationMockService} from '../../../shared/services/impl/authentification-mock.service';
import {LoginResponse} from '../../../shared/models/utilisateur.model';

@Component({
  selector: 'ism-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  // 1 ere approche
  
}
