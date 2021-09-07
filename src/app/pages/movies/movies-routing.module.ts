import { MoviesFormComponent } from './movies-form/movies-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';


const routes: Routes = [
  { path: 'movies', component: MovieListComponent},
  { path: 'movies/:id', component: MovieSingleComponent},
  { path: 'movie-manager', component: MoviesFormComponent},
  { path: 'movie-manager/:id', component: MoviesFormComponent},
  { path: '', redirectTo: '/movies',  pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
