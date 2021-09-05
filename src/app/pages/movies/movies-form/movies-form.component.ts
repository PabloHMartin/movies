import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      year: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      imdbRating: ['', [Validators.required]],
      actors: ['', [Validators.required]],
    });

  }


  get title() {
    return this.form.get('title');
  }
  get poster() {
    return this.form.get('poster');
  }
  get genre() {
    return this.form.get('genre');
  }
  get year() {
    return this.form.get('year');
  }
  get duration() {
    return this.form.get('duration');
  }
  get imdbRating() {
    return this.form.get('imdbRating');
  }
  get actors() {
    return this.form.get('actors');
  }


    async onSubmit() {

    this.loading = true;

    this.loading = false;
  }


}
