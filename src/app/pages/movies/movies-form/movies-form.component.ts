import { ToolbarService } from './../../../shared/services/toolbar.service';
import { DialogComponent } from './../components/dialog/dialog.component';
import { MoviesService } from './../services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from './../../../shared/services/db.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor } from 'src/app/shared/models/actor.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  MOVIELIST_URL = 'movies';
  TITLE = 'newMovie';

  form: FormGroup;
  loading = false;
  availableActors: Actor[] = [];
  defaultGenres: string[] = [];
  defaultActors: number[] = [];
  isEdit: boolean = false;
  idToEdit: string = '';

  constructor(private fb: FormBuilder,
              private moviesService: MoviesService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public toolbar: ToolbarService) { }

  ngOnInit(): void {

    this.getActorsFromApi();

    this.route.params.subscribe(
      ({id}) => {
        if(localStorage.getItem(id)){
          this.isEdit = true;
          this.idToEdit = id;
          let movieToUpdate: Movie = JSON.parse(localStorage.getItem(id)) as Movie;
          this.toolbar.setToolbarTitle(movieToUpdate.title);
          this.createFormFromMovie(movieToUpdate);
        }else{
          this.toolbar.setToolbarTitle(this.TITLE);
          this.createNewForm();
        }
      }
    )
  }

  createFormFromMovie(movie: Movie) {
    const { title, poster, genre, year, duration,imdbRating, actors} = movie;
    this.defaultGenres = genre;
    this.defaultActors = actors;
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

    const movie: Movie = this.form.value;

    if(this.isEdit){
      this.moviesService.editMovie(movie, this.idToEdit).subscribe(
        movie => {
          if(movie){
            console.log(movie);
             this.openDialog();
             this.router.navigateByUrl(this.MOVIELIST_URL);
          }else{
            console.log('error');
             this.openDialog();
             this.router.navigateByUrl(this.MOVIELIST_URL);
          }
        }
      );

    }else{
      this.moviesService.addMovie(movie).subscribe(
        movie => {
          if(movie){
            console.log(movie);
            this.loading = false;
            this.openDialog();
            this.router.navigateByUrl(this.MOVIELIST_URL);
          }else{
            console.log('error');
            this.loading = false;
            this.openDialog();
            this.router.navigateByUrl(this.MOVIELIST_URL);
          }
        }
      );
    }



  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        isEdit: this.isEdit
      }
    });
  }

}
