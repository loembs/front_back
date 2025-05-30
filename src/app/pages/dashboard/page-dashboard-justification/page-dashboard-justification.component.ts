import { Component, OnInit } from '@angular/core';
import { JustificationComponent } from '../components/dashboard/justification/justification.component';
import { CommonModule } from '@angular/common';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { FormsModule } from '@angular/forms';

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
  justifications: any[] = []
  allJustifications: any[] = [];
  selectedDate: string | null = null;
  selectedStatus: string = '';

  constructor(private justificationService: JustificationService) {}

  ngOnInit(): void {
    this.allJustifications = [
      {
        id: 1,
        photo: '',
        nom: 'Étudiant Test 1',
        matricule: 'E123',
        classe: 'L3 Info',
        date: '2023-10-26',
        cours: 'Angular',
        status: 'EN_ATTENTE'
      },
      {
        id: 2,
        photo: '',
        nom: 'Étudiant Test 2',
        matricule: 'E456',
        classe: 'L3 Info',
        date: '2023-10-25',
        cours: 'Java',
        status: 'VALIDEE'
      },
      {
        id: 3,
        photo: '',
        nom: 'Étudiant Test 3',
        matricule: 'E789',
        classe: 'L3 Info',
        date: '2023-10-26',
        cours: 'PHP',
        status: 'VALIDEE'
      },
      {
        id: 4,
        photo: '',
        nom: 'Étudiant Test 4',
        matricule: 'E987',
        classe: 'L3 Info',
        date: '2023-10-24',
        cours: 'Python',
        status: 'EN_ATTENTE'
      }
    ];
    this.applyFilter();
  }

  applyFilter(): void {
    let filteredJustifications = this.allJustifications;

    if (this.selectedDate) {
      filteredJustifications = filteredJustifications.filter(justification => {
        return justification.date === this.selectedDate;
      });
    }

    if (this.selectedStatus) {
      filteredJustifications = filteredJustifications.filter(justification => {
        return justification.status === this.selectedStatus;
      });
    }

    this.justifications = filteredJustifications;
  }
}
