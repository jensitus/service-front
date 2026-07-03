import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TheaterService} from '../services/theater.service';
import {Theater} from '../model/theater';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-theaters',
    templateUrl: './theaters.component.html',
    styleUrls: ['./theaters.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TheatersComponent implements OnInit {

  theaterList: Theater[];
  cineApiUrl = environment.cine_api_url;

  constructor(
    private theaterService: TheaterService
  ) { }

  ngOnInit() {
    if (this.cineApiUrl === null) {
      return;
    }
    this.theaterService.getTheaterList().subscribe(result => {
      this.theaterList = result;
    });
  }

}
