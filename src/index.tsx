import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/trending" element={<TrendingMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage/>} />
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
            </Routes>
          </MoviesContextProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

