import apiClient from './apiClient';

export const fetchNewMovies = async (page = 1) => {
  const response = await apiClient.get(`/films/phim-moi-cap-nhat?page=${page}`);
  return response.data.items;
};

export const fetchNowShowingMovies = async (page = 1) => {
  const response = await apiClient.get(`/films/danh-sach/phim-dang-chieu?page=${page}`);
  return response.data.items;
};

export const fetchMovieDetail = async (slug) => {
  const response = await apiClient.get(`/film/${slug}`);
  return response.data.movie;
};
export const fetchSearchMovies = async (keyword) => {
  const response = await apiClient.get(`/films/search?keyword=${keyword}`);
  return response.data.items;
};

export const fetchSeriesMovies = async (page = 1) => {
  const response = await apiClient.get(`/films/danh-sach/phim-bo?page=${page}`);
  return response.data.items;
};
export const fetchSingleMovies = async (page = 1) => {
  const response = await apiClient.get(`/films/danh-sach/phim-le?page=${page}`);
  return response.data.items;
};
export const fetchActionMovies = async () => {
  const response = await apiClient.get('/films/the-loai/hanh-dong');
  return response.data.items;
};