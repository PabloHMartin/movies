import { TestBed } from '@angular/core/testing';

import { DbService } from './db.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../models/movie.model';

const testData = [{
  "id": 2,
  "title": "El cuco",
  "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
  "genre": [
    "Horror",
    "Thriller"
  ],
  "year": 1987,
  "duration": 1872,
  "imdbRating": 1.992,
  "actors": [
    1
  ]
},
{
  "id": 3,
  "title": "Black Rain (Kuroi ame)",
  "poster": "http://dummyimage.com/400x600.png/5fa2dd/ffffff",
  "genre": [
    "Drama",
    "War",
    "sad",
    "asd"
  ],
  "year": 2011,
  "duration": 175,
  "imdbRating": 6.25,
  "actors": [
    7,
    8
  ]
},
{
  "id": 4,
  "title": "Spring Break Shark Attack",
  "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
  "genre": [
    "Adventure",
    "Drama",
    "Horror"
  ],
  "year": 1985,
  "duration": 190,
  "imdbRating": 3.66,
  "actors": [
    8,
    9,
    10
  ]
},
{
  "id": 5,
  "title": "Eulogy",
  "poster": "http://dummyimage.com/400x600.png/ff4444/ffffff",
  "genre": [
    "Comedy",
    "Crime",
    "Drama"
  ],
  "year": 1993,
  "duration": 117,
  "imdbRating": 5.36,
  "actors": [
    6,
    7,
    8
  ]
},
{
  "id": 6,
  "title": "V/H/S: Viral",
  "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
  "genre": [
    "Horror",
    "Thriller"
  ],
  "year": 1995,
  "duration": 239,
  "imdbRating": 6.99,
  "actors": [
    3,
    4,
    5
  ]
},
{
  "id": 7,
  "title": "Venus Wars (Venus Senki)",
  "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
  "genre": [
    "Action",
    "Animation",
    "Sci-Fi",
    "War"
  ],
  "year": 1992,
  "duration": 67,
  "imdbRating": 6.77,
  "actors": [
    1,
    3,
    5
  ]
},
{
  "id": 8,
  "title": "Godzilla vs. Mechagodzilla II (Gojira VS Mekagojira)",
  "poster": null,
  "genre": [
    "Action",
    "Drama",
    "Sci-Fi"
  ],
  "year": 1993,
  "duration": 121,
  "imdbRating": 5.36,
  "actors": [
    3,
    4,
    5
  ]
},
{
  "id": 9,
  "title": "Alien Nation: The Udara Legacy",
  "poster": "http://dummyimage.com/400x600.png/5fa2dd/ffffff",
  "genre": [
    "Sci-Fi"
  ],
  "year": 1997,
  "duration": 125,
  "imdbRating": 2.07,
  "actors": [
    7,
    8,
    9
  ]
},
{
  "id": 10,
  "title": "Butterflies Have No Memories",
  "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
  "genre": [
    "drama"
  ],
  "year": 1990,
  "duration": 73,
  "imdbRating": 4.39,
  "actors": [
    6,
    9,
    11
  ]
},
{
  "title": "El robo de la joya",
  "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
  "genre": [
    "picaresca"
  ],
  "year": 1985,
  "duration": 123,
  "imdbRating": 2,
  "actors": [
    2,
    3
  ],
  "id": 12
},
{
  "title": "Matrix",
  "poster": "",
  "genre": [
    "Acción"
  ],
  "year": 2000,
  "duration": 185,
  "imdbRating": 9.1,
  "actors": [
    2,
    3
  ],
  "id": 13
}];
const movie: Movie = {
  "id": 2,
  "title": "El cuco",
  "poster": "http://dummyimage.com/400x600.png/dddddd/000000",
  "genre": [
    "Horror",
    "Thriller"
  ],
  "year": 1987,
  "duration": 1872,
  "imdbRating": 1.992,
  "actors": [
    1
  ],
  "actorsInfo" : [
    {
  "id": 1,
  "first_name": "Isaak",
  "last_name": "McQuode",
  "gender": "Male",
  "bornCity": "Ciduren",
  "birthdate": "24/12/1957",
  "img": "http://dummyimage.com/600x400.png/dddddd/000000",
  "rating": 2.03,
  "movies": [
    3,
    7
  ]
}
  ]
};

fdescribe('DbService', () => {

  let dbService: DbService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DbService,
      ]
    });
    dbService = TestBed.inject(DbService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(dbService).toBeTruthy();
  });

  it('Should be the correct URI', () => {
    expect(dbService.MOVIES_URI).toBe('http://localhost:3000/movies')
  });


  it('getMovies should retrieve all movies', () => {
    dbService.getMovies().subscribe(
      movies => {
        expect(movies).toBeTruthy('No movies returned');
        expect(movies.length).toBe(11, "number of movies error");
      }
    )
    const req = httpTestingController.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toEqual("GET");

    req.flush(testData);
  })

  it('getMovie(2) should movie with id 2', () => {
    dbService.getMovie("2").subscribe(
      movie => {
        expect(movie).toBeTruthy('No movie returned');
        expect(movie.id).toBe(2, "Incorrect movie");
      }
    )
    const req = httpTestingController.expectOne('http://localhost:3000/movies/2');
    expect(req.request.method).toEqual("GET");

    req.flush(testData);
  })

  it('updateMovie(movie) should be called', () => {


    dbService.updateMovie(movie, "2").subscribe(
      movie => {
        expect(movie).toBeTruthy('No movie returned');
      }
    )

    const req = httpTestingController.expectOne('http://localhost:3000/movies/2');
    expect(req.request.method).toEqual("PATCH");

    req.flush(testData);
  })


  it('deletemovie should be called', () => {

    dbService.deleteMovie("2").subscribe(
      data => {
        expect(data).toBe('');
      }
    )

    const req = httpTestingController.expectOne('http://localhost:3000/movies/2');
    expect(req.request.method).toEqual("DELETE");

    req.flush(testData);
  })

  it('addMovie should be called', () => {

    dbService.addMovie(movie).subscribe(
      data => {
        expect(data).toBeTruthy();
      }
    )

    const req = httpTestingController.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toEqual("POST");

    req.flush(testData);
  })

  it('getActors should be called', () => {

    dbService.getActors().subscribe(
    )

    const req = httpTestingController.expectOne('http://localhost:3000/actors');
    expect(req.request.method).toEqual("GET");

    req.flush(testData);
  })
});
