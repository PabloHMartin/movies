import { ToolbarService } from './../../../shared/services/toolbar.service';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );


  NEW_MOVIE = 'movie-manager';
  TITLE = 'movies';
  defaultImgUrl = '../../../../assets/img/default-image.png';

  movies: Movie[] = [];

  constructor(public moviesService: MoviesService,
              private router: Router,
              public toolbar: ToolbarService,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.moviesService.getMovies();
    this.toolbar.setToolbarTitle(this.TITLE);
  }

  addNew(): void{
    this.router.navigateByUrl(this.NEW_MOVIE);
  }

}
