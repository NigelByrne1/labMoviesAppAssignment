import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularTVShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  tvShowTitleFilter,
  tvShowGenreFilter,
} from "../components/tvShowFilterUI";
import { BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { Box } from "@mui/material";

const titleFiltering = {
  name: "title",
  value: "",
  condition: tvShowTitleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: tvShowGenreFilter,
};

const PopularTVShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data: tvShows, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    ["popularTVShows", page],
    () => getPopularTVShows(page)
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

  const displayedTVShows = filterFunction(tvShows || []);
  const totalPages = 20;

  return (
    <>
      <PageTemplate
        title="Popular TV Shows"
        movies={displayedTVShows}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        action={(tvShow: BaseMovieProps) => {
          return (
            <Box>
              <AddToMustWatchIcon {...tvShow} />
              <AddToFavouritesIcon {...tvShow} />
            </Box>
          );
        }}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default PopularTVShowsPage;
