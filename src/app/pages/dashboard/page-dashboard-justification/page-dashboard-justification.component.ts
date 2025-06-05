import { Component, OnInit } from '@angular/core';
import { JustificationComponent } from '../components/dashboard/justification/justification.component';
import { CommonModule } from '@angular/common';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { FormsModule } from '@angular/forms';
import { JustificationStatus } from '../../../shared/store/app.store';
import { JustificationDashboardDto } from '../../../shared/models/dto/Request/justificationDashboardDto';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../shared/models/utilisateur.model';

interface JustificationData {
  id: number;
  images: string;
  nomEtudiant: string;
  matricule: string;
  nomClasse: string;
  date: string;
  nomModule: string;
  enumJustification: JustificationStatus;
  motif: string;
  pieceJointeUrl: string;
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

  constructor(private justificationService: JustificationService, private router: Router) {}

  ngOnInit(): void {
    this.loadJustifications();
  }

  loadJustifications(): void {
    this.loading = true;
    this.error = null;

    this.justificationService.getJustifications().subscribe({
      next: (response: any) => {
        console.log('Réponse brute du backend:', response); 
        const justifications = Array.isArray(response.content) ? response.content : [];
        this.allJustifications = this.mapDtoToJustificationData(response.content);
        this.applyFilter();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des justifications:', error);
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
        // En cas d'erreur, utiliser les données de fallback
        this.loadFallbackData();
      }
    });
  }

  /**
   * Mappe les données DTO vers l'interface JustificationData
   */
  private mapDtoToJustificationData(dtos: JustificationDashboardDto[]): JustificationData[] {
     if (!Array.isArray(dtos)) {
    console.error('❌ Données invalides dans mapDtoToJustificationData:', dtos);
    return [];
  }
    return dtos.map(dto => ({
      id: parseInt(dto.id.toString()) || 0,
      images: dto.images || '',
      nomEtudiant: dto.nomEtudiant || '',
      matricule: dto.matricule || '',
      nomClasse: dto.nomClasse || '',
      date: dto.date?.toString() || '',
      nomModule: dto.nomModule || '',
      enumJustification: this.mapStatus(dto.enumJustification || ''),
      motif: dto.motif || '',
      pieceJointeUrl: dto.pieceJointeUrl || ''
    }));
  }

  /**
   * Mappe le statut du DTO vers le type JustificationStatus
   */
  private mapStatus(status: string): JustificationStatus {
    switch (status?.toUpperCase()) {
      case 'EN_ATTENTE':
        return 'En-attente';
      case 'VALIDEE':
      case 'VALIDE':
        return 'Validee';
      case 'REFUSEE':
      case 'REFUSE':
        return 'Refusee';
      default:
        return 'En-attente';
    }
  }

  /**
   * Données de fallback en cas d'erreur de chargement
   */
  private loadFallbackData(): void {
    this.allJustifications = [
      {
        id: 1,
        images: '',
        nomEtudiant: 'Exauce Amour',
        matricule: 'E123',
        nomClasse: 'L3 GLRS',
        date: '2023-10-26',
        nomModule: 'Angular',
        enumJustification: 'En-attente',
        motif: 'Cause maladie',
        pieceJointeUrl: ''
      },
      {
        id: 2,
        images: '',
        nomEtudiant: 'Poathy Patrick',
        matricule: 'E456',
        nomClasse: 'L3 GLRS',
        date: '2023-10-25',
        nomModule: 'Java',
        enumJustification: 'Validee',
        motif: 'Rendez-vous',
        pieceJointeUrl: ''
      },
      {
        id: 3,
        images: '',
        nomEtudiant: 'Mame Diarra Fall',
        matricule: 'E789',
        nomClasse: 'L3 GLRS',
        date: '2023-10-26',
        nomModule: 'PHP',
        enumJustification: 'Validee',
        motif: 'Urgence familiale',
        pieceJointeUrl: ''
      },
      {
        id: 4,
        images: '',
        nomEtudiant: 'Salimatou',
        matricule: 'E987',
        nomClasse: 'L3 CDSD',
        date: '2023-10-24',
        nomModule: 'Python',
        enumJustification: 'En-attente',
        motif: 'Problème de transport',
        pieceJointeUrl: ''
      },
      {
        id: 5,
        images: '',
        nomEtudiant: 'Sydney ITIERE',
        matricule: 'E987',
        nomClasse: 'L3 IAGE',
        date: '2023-10-24',
        nomModule: 'Python',
        enumJustification: 'Refusee',
        motif: 'En retard',
        pieceJointeUrl: ''
      }
    ];
    this.applyFilter();
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
      const statusToFilter = this.mapStatus(this.selectedStatus);
      filtered = filtered.filter(justification => {
        return justification.enumJustification === statusToFilter;
      });
    }

    this.filteredJustifications = filtered;
  }

  goToAbsences(): void {
  this.router.navigate(['/dashboard/absences']);
}

  /**
   * Méthode pour rafraîchir les données
   */
  refreshData(): void {
    this.loadJustifications();
  }
}