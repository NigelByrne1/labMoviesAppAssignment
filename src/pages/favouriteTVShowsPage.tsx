import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { TVShowsContext } from "../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  tvShowTitleFilter,
  tvShowGenreFilter,
} from "../components/tvShowFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
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

const FavouriteTVShowsPage: React.FC = () => {
  const { favourites: tvShowIds } = useContext(TVShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteTVShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", tvShowId],
        queryFn: () => getTVShow(tvShowId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTVShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTVShowQueries.map((q) => q.data);
  const displayedTVShows = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        movies={displayedTVShows}
        action={(tvShow) => {
          return (
            <Box>
              <RemoveFromFavourites {...tvShow} />
              <WriteReview {...tvShow} />
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

export default FavouriteTVShowsPage;