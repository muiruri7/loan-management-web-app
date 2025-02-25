import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-mycharts',
  templateUrl: './my-charts.component.html',
  styleUrls: ['./my-charts.component.css']
})
export class MychartsComponent implements OnInit {
  loans: any[] = [];
  approvedCount = 0;
  rejectedCount = 0;
  pendingCount = 0;

  constructor(private loanService: LoanService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.processLoanData();
      },
      error: (err) => console.error('Failed to fetch loans:', err)
    });
  }

  processLoanData(): void {
    this.approvedCount = this.loans.filter(loan => loan.status === 'approved').length;
    this.rejectedCount = this.loans.filter(loan => loan.status === 'rejected').length;
    this.pendingCount = this.loans.filter(loan => loan.status === 'pending').length;

    this.createPieChart();
    this.createBarChart();
  }

  createPieChart() {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Approved', 'Rejected', 'Pending'],
        datasets: [{
          data: [this.approvedCount, this.rejectedCount, this.pendingCount],
          backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
          hoverBackgroundColor: ['#28a745', '#dc3545', '#ffc107'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }

  createBarChart() {
    const monthlyCounts = this.getMonthlyLoanCounts();
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: Object.keys(monthlyCounts),
        datasets: [{
          label: 'Loans Issued',
          data: Object.values(monthlyCounts),
          backgroundColor: '#007bff',
          borderColor: '#0056b3',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }

  getMonthlyLoanCounts(): { [key: string]: number } {
    const monthlyCounts: { [key: string]: number } = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.loans.forEach(loan => {
      const monthIndex = new Date(loan.dateIssued).getMonth();
      const monthName = monthNames[monthIndex];
      monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + 1;
    });

    return monthlyCounts;
  }
}
