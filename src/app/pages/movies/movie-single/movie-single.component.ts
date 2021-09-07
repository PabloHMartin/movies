import { DialogDeleteComponent } from './../components/dialog-delete/dialog-delete.component';
import { MoviesService } from '../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie.model';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';

@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: ['./movie-single.component.scss']
})
export class MovieSingleComponent implements OnInit {


  EDIT_URL = 'movie-manager';
  MOVIELIST_URL = 'movies';

  movieId: string = '';

  constructor(private route: ActivatedRoute,
              public moviesService: MoviesService,
              private router: Router,
              public dialog: MatDialog,
              private toolbar: ToolbarService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      ({id}) => {
        this.movieId = id;
        this.moviesService.getMovie(id)
      }
    )
  }

  editMovie(movie: Movie): void {
    this.saveToLocalStorage(movie);
    this.router.navigateByUrl(`${this.EDIT_URL}/${movie.id}`);
  }

  deleteMovie(movie: Movie): void{
    this.openDialog(movie);
  }

  private saveToLocalStorage(movie: Movie): void {
    localStorage.clear();
    localStorage.setItem(`${movie.id}`, JSON.stringify(movie))
  }

    openDialog(movie: Movie): void {



    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
       if(result){
          this.moviesService.deleteMovie(movie.id.toString());
          this.router.navigateByUrl(this.MOVIELIST_URL);
       }
    });
  }

}
