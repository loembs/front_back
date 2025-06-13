import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {AuthentificationService} from '../../../shared/services/impl/authentification-mock.service';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Tentative de connexion avec:', username);
      
      this.authService.login(username, password).subscribe({
        next: (user) => {
          console.log('Connexion réussie:', user);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);
          this.error = 'Identifiants invalides';
        }
      });
    }
  }
}