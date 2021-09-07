import { MoviesService } from './../services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  defaultGenres: string[] = [];
  isEdit: boolean = false;

  constructor(private fb: FormBuilder,
              private moviesService: MoviesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      ({id}) => {
        if(localStorage.getItem(id)){
          this.isEdit = true;
          let movieToUpdate: Movie = JSON.parse(localStorage.getItem(id)) as Movie;
          this.createFormFromMovie(movieToUpdate);
        }else{
          this.getActorsFromApi();
          this.createNewForm();
        }
      }
    )
  }

  createFormFromMovie(movie: Movie) {
    const { title, poster, genre, year, duration,imdbRating, actors} = movie;
    this.defaultGenres = genre;
    this.form = this.fb.group({
      title: [title, [Validators.required]],
      poster: [poster, [Validators.required]],
      genre: [genre, [Validators.required, Validators.minLength(1)]],
      year: [year, [Validators.required]],
      duration: [duration, [Validators.required]],
      imdbRating: [imdbRating, [Validators.required]],
      actors: [actors, [Validators.required]],
    });
  }

  createNewForm() {
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

  private getActorsFromApi(){
    this.moviesService.getActors().subscribe(
      actors => this.availableActors = actors
    );
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

    if(this.isEdit){
      this.moviesService.editMovie(movie).subscribe(
        movie => {
          if(movie){
            console.log(movie);
          }else{
             console.log('error');
          }
        }
      );

    }else{
      this.moviesService.addMovie(movie).subscribe(
        movie => {
          if(movie){
            console.log(movie);
          }else{
             console.log('error');
          }
        }
      );
    }


    this.router.navigateByUrl(this.MOVIELIST_URL);
    this.loading = false;
  }


}
