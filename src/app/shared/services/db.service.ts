import { Movie } from './../models/movie.model';
import { Actor } from './../models/actor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.MOVIES_URI}/${id}`);
  }

  updateMovie(movie: Movie): Observable<Movie> {

   const body = { ...movie };

   return this.http.put<any>(`${this.MOVIES_URI}/${movie.id}`, body)
  }

  deleteMovie(id: string): Observable<string> {
    let status = '';
    this.http.delete<Movie>(`${this.MOVIES_URI}/${id}`).subscribe(() => status = 'Delete successful');
    return of(status);
  }

  addMovie(movie: Movie): void {
    console.log('movie', movie);

    this.http.post<any>(this.MOVIES_URI, movie);
  }

  getActors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.ACTORS_URI);
  }

}
