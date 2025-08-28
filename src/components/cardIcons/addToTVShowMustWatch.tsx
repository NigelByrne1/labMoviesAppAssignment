import React, { MouseEvent, useContext } from "react";
import { TVShowsContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseTVShowProps } from "../../types/interfaces";

const AddToTVShowMustWatchIcon: React.FC<BaseTVShowProps> = (tvShow) => {
  const context = useContext(TVShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(tvShow);
  };

  return (
    <IconButton aria-label="add to tv show must watch" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVShowMustWatchIcon;
