import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DiaryService} from '../services/diary.service';
import {Diary} from '../model/diary';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DiaryComponent implements OnInit {

  diary: Diary;
  diary_id: string;
  diary_title: string;
  diary_text: string;

  constructor(
    private diaryService: DiaryService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.diaryService.getDiary().subscribe({
      next: data => {
        this.diary = data;
        this.diary_title = this.diary.title;
        this.diary_text = this.diary.text;
      }, error: err => {
        this.alertService.error(err);
      }
    });
  }
}
