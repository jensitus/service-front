import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiaryService} from '../services/diary.service';
import {Diary} from '../model/diary';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-edit-diary',
    templateUrl: './edit-diary.component.html',
    styleUrls: ['./edit-diary.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EditDiaryComponent implements OnInit {

  diary: Diary;
  diary_id: string;
  diaryForm: FormGroup;
  val: any;
  loading = false;
  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private diaryService: DiaryService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.diary_id = params['id'];
    });
    this.diaryForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
    this.diaryService.getDiary().subscribe(data => {
      this.val = {
        title: data.title,
        body: data.text
      };
      this.diaryForm.setValue(this.val);
    }, error => {
      this.alertService.error(error);
    });
  }

  get f() {
    return this.diaryForm.controls;
  }

  onSubmit() {
    this.diaryService.updateDiary(this.diaryForm.value).pipe(first()).subscribe(data => {
      console.log(data);
      this.alertService.success('Yes', true);
      this.router.navigate(['diaries/' + this.diaryForm.value.id]);
    }, error => {
      this.alertService.error(error);
    });
  }


}
