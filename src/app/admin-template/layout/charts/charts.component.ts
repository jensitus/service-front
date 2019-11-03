import {Component, Input, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {TodoService} from '../../../todo-item/services/todo.service';
import {User} from '../../../auth/model/user';
import {Item} from '../../../todo-item/model/item';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {

  private currentUser: User;
  items: any;

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];
  public barChartLabelVersuch: string[] = new Array();
  public barChartType: string;
  public barChartLegend: boolean;
  public versuchsArray: any[] = new Array();
  public itemsPerKey: any[] = [];

  public barChartData: any[] = [
    {data: [10], label: 'Series '},
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [25, 45, 10, 19, 99, 20, 70], label: 'Series C'}
  ];

  public barChartDataVersuch: any[] = [];
  public data: any[] = new Array();
  public label: string;

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string;

  // Radar
  public radarChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ];
  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType: string;

  // Pie
  public pieChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales'
  ];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string;

  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales',
    'Telesales',
    'Corporate Sales'
  ];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend: boolean;

  public polarAreaChartType: string;

  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean;
  public lineChartType: string;

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit() {
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.doughnutChartType = 'doughnut';
    this.radarChartType = 'radar';
    this.pieChartType = 'pie';
    this.polarAreaLegend = true;
    this.polarAreaChartType = 'polarArea';
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.getCurrentUser();
    this.getBarChartLabels();
    console.log('versuch');
    console.log(this.barChartData);
    // if (this.barChartDataVersuch != null) {
    //   console.log(this.barChartDataVersuch);
    // }
  }

  private getBarChartLabels() {
    this.todoService.getTimelineDtoMap(this.currentUser.id).subscribe(response => {
      this.items = response;
      let i = 0;
      let objectDonner;
      Object.keys(this.items).forEach(key => {
        this.barChartLabelVersuch.push(key);
        console.log('key', key);
        console.log(this.items[key]);
        this.data = this.items[key];
        this.label = 'label' + '_' + i++;
        objectDonner = {
          data: this.data.length,
          label: this.label
        };
        this.itemsPerKey = [];
        this.itemsPerKey.push(this.data.length);
        console.log(this.itemsPerKey);
        this.barChartData.push({
          // data: this.itemsPerKey,
          // label: this.label
          data: [this.data.length],
          label: 'Series ' + i++
        });
        // this.barChartDataVersuch.push();
        // this.barChartDataVersuch.push(objectDonner);
        // console.log('barChartDataVersuch');
        // console.log(this.barChartDataVersuch);
        // console.log('versuchsArray');
        // console.log(this.versuchsArray);
      });
    }, error => {
      console.log(error);
    });
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
