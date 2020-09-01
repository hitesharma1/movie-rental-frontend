import http from "./httpService";
const url = "http://localhost:8000/api/movies";

export function getMovies() {
  return http.get(url);
}

export function deleteMovie(id) {
  http.delete(url + "/" + id);
}
