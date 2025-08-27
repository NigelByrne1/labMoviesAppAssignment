import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTrendingMovies } from "../api/tmdb-api"; //import upcomg movies
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { Box } from "@mui/material";
import TimeWindowSelector from "../components/timeWindowSelector";



const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TrendingMoviesPage: React.FC = () => {

  const [timeWindow, setTimeWindow] = useState("week");

  const { data: movies, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    ["trending", timeWindow],
    () => getTrendingMovies(timeWindow)
    );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =

      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const displayedMovies = filterFunction(movies || []);

  return (
    <>
      <PageTemplate
        TimeWindowSelector={TimeWindowSelector}
        timeWindow={timeWindow}
        onTimeWindowChange={setTimeWindow}
        title="Trending Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return (
            <Box>
              <AddToMustWatchIcon {...movie} />
              <AddToFavouritesIcon {...movie} />
              
            </Box>
          );
        }}
      /> 
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TrendingMoviesPage;
