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