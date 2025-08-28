import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action, currentPage = 1, totalPages = 1, onPageChange })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
