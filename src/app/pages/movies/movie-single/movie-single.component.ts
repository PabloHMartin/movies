import { DbService } from './../../../shared/services/db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: ['./movie-single.component.scss']
})
export class MovieSingleComponent implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private db: DbService) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(({id}) => this.db.getMovie(id))
    ).subscribe( movie => {
      this.movie = movie
    })
  }

}
