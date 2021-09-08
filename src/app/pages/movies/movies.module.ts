import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';
import { MoviesFormComponent } from './movies-form/movies-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenresInputComponent } from './movies-form/components/genres-input/genres-input.component';
import { ActorsComponent } from './movies-form/components/actors/actors.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';



@NgModule({
  declarations: [MovieListComponent, MovieSingleComponent, MoviesFormComponent, GenresInputComponent, ActorsComponent, DialogComponent, DialogDeleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class MoviesModule { }
