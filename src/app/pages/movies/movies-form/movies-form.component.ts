import { Router } from '@angular/router';
import { DbService } from './../../../shared/services/db.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor } from 'src/app/shared/models/actor.model';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  MOVIELIST_URL = 'movies';

  form: FormGroup;
  loading = false;
  availableActors: Actor[] = [];

  constructor(private fb: FormBuilder,
              private db: DbService,
              private router: Router) { }

  ngOnInit(): void {

    this.db.getActors().subscribe(
      actors => this.availableActors = actors
    );

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      genre: ['', [Validators.required, Validators.minLength(1)]],
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

    const movie: Movie = this.form.value;

    this.db.addMovie(movie);

    this.router.navigateByUrl(this.MOVIELIST_URL);
    this.loading = false;
  }


}
