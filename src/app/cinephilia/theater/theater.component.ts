import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TheaterService} from '../services/theater.service';
import {Theater} from '../model/theater';
import {TheaterSchedules} from '../model/theater-schedules';
import {MovieService} from '../services/movie.service';
import {Schedule} from '../model/schedule';
import {Movie} from '../model/movie';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css'],
  providers: [DatePipe]
})
export class TheaterComponent implements OnInit {

  id: number;
  navBarTitlePrefix = 'cinephilia';
  theater: Theater;
  theaterName: string;
  theaterAddress: string;
  theaterUrl: string;
  today = new Date();
  theaterWithSchedules: TheaterSchedules;
  value: any;
  movieForTheaterWithSchedules = new Map<string, Map<string, Schedule[]>>();
  schedules = new Map<string, Schedule[]>();
  movies: Movie[];
  cineApiUrl = environment.cine_api_url;

  constructor(
    private activatedRoute: ActivatedRoute,
    private theaterService: TheaterService,
    private datePipe: DatePipe,
    private movieService: MovieService
  ) {
  }

  ngOnInit() {
    if (this.cineApiUrl === null) {
      return;
    }
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.theaterService.getTheater(this.id).subscribe(theater => {
      this.theater = theater;
      this.theaterName = this.theater.name;
      this.theaterAddress = this.theater.address;
      this.theaterUrl = this.theater.url;
    });
    this.getTheMovies();
  }

  private getOnlyTheSchedules() {
    this.theaterService.getTheaterSchedules(this.id).subscribe(schedules => {
      this.schedules = schedules;
    });
  }

  private getTheMovies() {
    this.theaterService.getTheaterSchedulesMovies(this.id).subscribe(theaterMovieSchedules => {
      this.movieForTheaterWithSchedules = theaterMovieSchedules;
      console.log(this.movieForTheaterWithSchedules);
    });
  }

}
