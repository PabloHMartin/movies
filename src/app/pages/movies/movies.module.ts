import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';
import { MoviesFormComponent } from './movies-form/movies-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MovieListComponent, MovieSingleComponent, MoviesFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MoviesRoutingModule,
    ReactiveFormsModule
  ]
})
export class MoviesModule { }
