import { Actor } from "./actor.model";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  duration: number;
  imdbRating: number;
  actors: number[] | Actor[];
}
