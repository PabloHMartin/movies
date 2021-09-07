import { DbService } from './../../../shared/services/db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: ['./movie-single.component.scss']
})
export class MovieSingleComponent implements OnInit {


  EDIT_URL = 'movie-manager';
  MOVIELIST_URL = 'movies';

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private db: DbService,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(({id}) => this.db.getMovie(id))
    ).subscribe( movie => {
      this.movie = movie
    })
  }

  editMovie(movie: Movie): void {
    this.router.navigateByUrl(`${this.EDIT_URL}/${movie.id}`);
  }

  deleteMovie(movie: Movie): void{
    this.db.deleteMovie(movie.id.toString());
    this.router.navigateByUrl(this.MOVIELIST_URL);
  }

}
