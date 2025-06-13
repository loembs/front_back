import { Component, OnInit } from '@angular/core';
import { JustificationComponent } from '../components/dashboard/justification/justification.component';
import { CommonModule } from '@angular/common';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { FormsModule } from '@angular/forms';
import { JustificationStatus } from '../../../shared/store/app.store';
import { JustificationDashboardDto } from '../../../shared/models/dto/Request/justificationDashboardDto';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../../../shared/models/utilisateur.model';

interface JustificationData {
  id: string;
  image: string;
  nomEtudiant: string;
  matricule: string;
  nomClasse: string;
  date: string;
  nomModule: string;
  enumJustification: JustificationStatus;
  motif: string;
  pieceJointe: string[];
}

@Component({
  selector: 'ism-page-dashboard-justification',
  imports: [
    JustificationComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './page-dashboard-justification.component.html',
  styleUrl: './page-dashboard-justification.component.css'
})
export class PageDashboardJustificationComponent implements OnInit {
  allJustifications: JustificationData[] = [];
  filteredJustifications: JustificationData[] = [];
  searchTerm: string = '';
  selectedDate: string | null = null;
  selectedStatus: JustificationStatus | '' = '';
  loading: boolean = false;
  error: any| null = null;
  userInfo: Utilisateur | null = null;

  constructor(private justificationService: JustificationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadJustifications();
    // S'abonner aux événements de navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadJustifications();
      }
    });
    // S'abonner aux changements de paramètres de requête
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        console.log('Rafraîchissement des justifications...');
        this.loadJustifications();
      }
    });
  }

  loadJustifications(): void {
    console.log('Chargement des justifications...');
    this.loading = true;
    this.justificationService.getJustifications().subscribe({
      next: (response: any) => {
        console.log('Réponse brute du backend:', response);
        // Vérifier si la réponse contient un tableau de justifications
        const justifications = Array.isArray(response) ? response : 
                             Array.isArray(response.content) ? response.content : [];
        
        console.log('Justifications extraites:', justifications);
        this.allJustifications = this.mapDtoToJustificationData(justifications);
        this.filteredJustifications = this.allJustifications;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des justifications:', error);
        this.error = error;
        this.loading = false;
      }
    });
  }

  /**
   * Mappe les données DTO vers l'interface JustificationData
   */
  private mapDtoToJustificationData(dtos: any[]): JustificationData[] {
    console.log('Mapping des DTOs:', dtos);
    return dtos.map(dto => ({
      id: dto.id?.toString() || '',
      images: dto.images || '',
      image: dto.image || [],
      nomEtudiant: dto.nomEtudiant || '',
      matricule: dto.matricule || '',
      nomClasse: dto.nomClasse || '',
      date: dto.date || '',
      nomModule: dto.nomModule || '',
      enumJustification: this.mapStatus(dto.statutJustification),
      motif: dto.motif || '',
      pieceJointe: dto.pieceJointe || ''
    }));
  }

  /**
   * Méthode pour rafraîchir les données
   */
  refreshData(): void {
    this.loadJustifications();
  }

  private mapStatus(status: string): JustificationStatus {
    switch (status?.toUpperCase()) {
      case 'VALIDER':
        return 'Valider';
      case 'REJETER':
        return 'Rejeter';
      case 'ENCOURS':
      case 'EN_ATTENTE':
        return 'EnCours';
      default:
        return 'EnCours';
    }
  }

  goToAbsences(): void {
  this.router.navigate(['/dashboard/absences']);
}

  applyFilter(): void {
    let filtered = this.allJustifications.filter(justification =>
      justification.nomEtudiant.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.selectedDate) {
      filtered = filtered.filter(justification => {
        return justification.date === this.selectedDate;
      });
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(justification => {
        return justification.enumJustification === this.selectedStatus;
      });
    }

    this.filteredJustifications = filtered;
  }
}