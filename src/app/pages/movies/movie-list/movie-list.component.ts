import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  NEW_MOVIE = 'movie-manager';

  movies: Movie[] = [];

  constructor(public moviesService: MoviesService,
              private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMovies();
  }

  addNew(): void{
    this.router.navigateByUrl(this.NEW_MOVIE);
  }

}
