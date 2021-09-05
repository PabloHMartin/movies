import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';



@NgModule({
  declarations: [MovieListComponent, MovieSingleComponent],
  imports: [
    CommonModule,
    SharedModule,
    MoviesRoutingModule,
  ]
})
export class MoviesModule { }
