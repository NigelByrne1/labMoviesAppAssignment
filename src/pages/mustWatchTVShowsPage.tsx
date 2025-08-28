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
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";
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

const MustWatchTVShowsPage: React.FC = () => {
  const { mustWatch: tvShowIds } = useContext(TVShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const mustWatchTVShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", tvShowId],
        queryFn: () => getTVShow(tvShowId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchTVShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatch = mustWatchTVShowQueries.map((q) => q.data);
  const displayedTVShows = allMustWatch
    ? filterFunction(allMustWatch)
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
        title="Must Watch TV Shows"
        movies={displayedTVShows}
        action={(tvShow) => {
          return (
            <Box>
              <RemoveFromMustWatchIcon {...tvShow} />
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

export default MustWatchTVShowsPage;
