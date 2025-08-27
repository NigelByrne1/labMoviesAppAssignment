import React, { MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useNavigate } from "react-router-dom";
import {BaseMovieProps} from "../../types/interfaces";

const WriteReviewIcon: React.FC<BaseMovieProps> = (movie) => {
  const navigate = useNavigate();

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/reviews/form', {
      state: {
        movieId: movie.id,
      }
    });
  };

  return (
    <IconButton
      aria-label="write review"
      onClick={onUserRequest}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default WriteReviewIcon;
