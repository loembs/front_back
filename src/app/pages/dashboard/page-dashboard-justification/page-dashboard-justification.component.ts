import { Component, OnInit } from '@angular/core';
import { JustificationComponent } from '../components/dashboard/justification/justification.component';
import { CommonModule } from '@angular/common';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { FormsModule } from '@angular/forms';
import { JustificationStatus } from '../../../shared/store/app.store';

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
  allJustifications: JustificationData[] = [];
  filteredJustifications: JustificationData[] = [];
  searchTerm: string = '';
  selectedDate: string | null = null;
  selectedStatus: JustificationStatus | '' = '';

  constructor(private justificationService: JustificationService) {}

  ngOnInit(): void {
    this.allJustifications = [
      {
        id: 1,
        photo: '',
        nom: 'Exauce Amour',
        matricule: 'E123',
        classe: 'L3 GLRS',
        date: '2023-10-26',
        cours: 'Angular',
        status: 'EN_ATTENTE',
        motif: 'Cause maladie'
      },
      {
        id: 2,
        photo: '',
        nom: 'Poathy Patrick',
        matricule: 'E456',
        classe: 'L3 GLRS',
        date: '2023-10-25',
        cours: 'Java',
        status: 'VALIDEE',
        motif: 'Rendez-vous'
      },
      {
        id: 3,
        photo: '',
        nom: 'Mame Diarra Fall',
        matricule: 'E789',
        classe: 'L3 GLRS',
        date: '2023-10-26',
        cours: 'PHP',
        status: 'VALIDEE',
        motif: 'Urgence familiale'
      },
      {
        id: 4,
        photo: '',
        nom: 'Salimatou',
        matricule: 'E987',
        classe: 'L3 CDSD',
        date: '2023-10-24',
        cours: 'Python',
        status: 'EN_ATTENTE',
        motif: 'Problème de transport'
      },
      {
        id: 5,
        photo: '',
        nom: 'Sydney ITIERE',
        matricule: 'E987',
        classe: 'L3 IAGE',
        date: '2023-10-24',
        cours: 'Python',
        status: 'REFUSEE',
        motif: 'En retard'
      }
    ];
    this.applyFilter();
  }

  applyFilter(): void {
    let filtered = this.allJustifications.filter(justification =>
      justification.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.selectedDate) {
      filtered = filtered.filter(justification => {
        return justification.date === this.selectedDate;
      });
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(justification => {
        return justification.status === this.selectedStatus;
      });
    }

    this.filteredJustifications = filtered;
  }
}
