const API_KEY = `ad34ee2d67262d08f5c6c826cea108c9`;
const BASE_PATH = `https://api.themoviedb.org/3/`;

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: 1;
  results: IMovie[];
  total_pages: 67;
  total_results: 1338;
}

export function getMovies() {
  // 20 movies data
  return fetch(`${BASE_PATH}movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
