import { Movie } from './../models/movie.model';
import { Actor } from './../models/actor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  MOVIES_URI: string = 'http://localhost:3000/movies';
  ACTORS_URI: string = 'http://localhost:3000/actors';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.MOVIES_URI);
  }

  private retrieveMovie(id: string): Observable<Movie>{
          return this.http.get<Movie>(`${this.MOVIES_URI}/${id}`);
  }

  getMovie(id: string): Observable<Movie> {
    return combineLatest([
      this.retrieveMovie(id),
      this.getActors(),
    ])
      .pipe(
        map(([movie, actors]) => {

          movie.actors.map(
            actorid => actorid = actors.filter( item => item.id == actorid)
          )
            console.log(movie);
         return movie;
        })
      );
  }

  updateMovie(movie: Movie): Observable<Movie> {

   const body = { ...movie };

   return this.http.patch<any>(`${this.MOVIES_URI}/${movie.id}`, body)
  }

  deleteMovie(id: string): Observable<string> {
    let status = '';
    this.http.delete<Movie>(`${this.MOVIES_URI}/${id}`).subscribe(() => status = 'Delete successful');
    return of(status);
  }

  addMovie(movie: Movie): Observable<Movie> {
   return  this.http.post<Movie>(this.MOVIES_URI, movie);
  }


  getActors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.ACTORS_URI);
  }

}
