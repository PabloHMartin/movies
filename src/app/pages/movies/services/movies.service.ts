import { DbService } from './../../../shared/services/db.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.model';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Actor } from 'src/app/shared/models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  private _movies: BehaviorSubject<Movie[]> = new BehaviorSubject(<Movie[]>([]));
  movies$: Observable<Movie[]> = this._movies.asObservable();

  private _movie: BehaviorSubject<Movie> = new BehaviorSubject(<Movie>({}));
  movie$: Observable<Movie> = this._movie.asObservable();

  movieSavedStatus: string = '';

  constructor(private db: DbService) { }

  getMovies(): void{
    this.db.getMovies().subscribe(
      movies => this._movies.next(movies)
    );
  }

  getMovie(id: string): void{
    this.db.getMovie(id).subscribe(
      movie => this._movie.next(movie)
    );
  }

  deleteMovie(id: string): void{
    this.db.deleteMovie(id);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.db.addMovie(movie);
  }

  editMovie(movie: Movie): Observable<Movie>{
    return this.db.updateMovie(movie);
  }

  getActors(): Observable<Actor[]>{
    return this.db.getActors();
  }
}
