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
  const [timeWindow, setTimeWindow] = useState<string>('week');
  const [page, setPage] = useState(1);

  const { data: movies, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    ["trending", timeWindow, page],
    () => getTrendingMovies(timeWindow, page)
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


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const displayedMovies = filterFunction(movies || []);
  const totalPages = 20; 

  return (
    <>
    <TimeWindowSelector 
      currentTimeWindow={timeWindow}
      onTimeWindowChange={setTimeWindow}
    />

      <PageTemplate
        title={`(${timeWindow.toUpperCase()}) - Trending Movies`}
        movies={displayedMovies}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
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
