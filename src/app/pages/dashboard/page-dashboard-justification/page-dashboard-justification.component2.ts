/*import { Component, OnInit,inject } from '@angular/core';
import { JustificationComponent } from '../components/dashboard/justification/justification.component';
import { CommonModule } from '@angular/common';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { FormsModule } from '@angular/forms';
import { JustificationStatus } from '../../../shared/store/app.store';
import { JustificationDashboardDto } from '../../../shared/models/dto/Request/justificationDashboardDto';
import { JustificationFilterDto } from '../../../shared/models/dto/Request/justicationFilterDto'

interface JustificationData {
  id: number;
  photo: string;
  nom: string;
  matricule: string;
  classe: string;
  date: string;
  cours: string;
  status: JustificationStatus;
  motif: string;
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
  private justificationService: JustificationService = inject(JustificationService);
  
  allJustifications: JustificationDashboardDto[] = [];
  filteredJustifications: JustificationDashboardDto[] = [];
  searchTerm: string = '';
  selectedDate: string | null = null;
  selectedStatus: JustificationStatus | '' = '';
  isLoading: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadJustifications();
  }

  private loadJustifications(): void {
    this.isLoading = true;
    this.error = null;
    
    this.justificationService.getJustifications().subscribe({
      next: (data) => {
        this.allJustifications = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des justifications:', error);
        this.error = 'Erreur lors du chargement des données';
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    let filtered = this.allJustifications.filter(justification =>
      justification.nom?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.selectedDate) {
      filtered = filtered.filter(justification => {
        // Convertir la Date en string pour la comparaison
        const justificationDateString = justification.date instanceof Date 
          ? justification.date.toISOString().split('T')[0]  // Format YYYY-MM-DD
          : justification.date;
        
        return justificationDateString === this.selectedDate;
      });
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(justification => {
        return justification.status === this.selectedStatus;
      });
    }

    this.filteredJustifications = filtered;
  }

  private applyClientSideSearchFilter(): void {
    this.filteredJustifications = this.allJustifications.filter(justification =>
      justification.nom?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  refreshData(): void {
    this.loadJustifications();
  }

  // Gestionnaires d'événements pour les filtres
  onSearchTermChange(): void {
    this.applyFilter();
  }

  onDateFilterChange(): void {
    this.applyFilter();
  }

  onStatusFilterChange(): void {
    this.applyFilter();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedDate = null;
    this.selectedStatus = '';
    this.loadJustifications();
  }
}*/
