import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
