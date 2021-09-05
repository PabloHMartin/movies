import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';



@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MoviesRoutingModule,
  ]
})
export class MoviesModule { }
