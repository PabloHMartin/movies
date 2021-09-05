import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';


const routes: Routes = [
  { path: 'movies', component: MovieListComponent},
  // { path: 'movies/:id', component: MovieSingleComponent},
  { path: '', redirectTo: '/movies',  pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
