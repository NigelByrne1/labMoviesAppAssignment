import React, {MouseEvent, useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseMovieProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Box from "@mui/material/Box";



const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
    margin: 0.5,
  },
  mustWatch: {
    backgroundColor: "rgb(255, 119, 0)",
    margin: 0.5,
  },
};

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({movie, action}) => {
  const { favourites, addToFavourites } = useContext(MoviesContext);//NEW
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  const isFavourite = favourites.find((id) => id === movie.id)? true : false;//NEW
  const isMustWatch = mustWatch.find((id) => id === movie.id)? true : false;

  return (
      <Card sx={styles.card}>
      <CardHeader
        avatar={
          <Box>
          {isFavourite ? (   //CHANGED
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null}
          {isMustWatch ? (
            <Avatar sx={styles.mustWatch}>
              <PlaylistAddIcon />
            </Avatar>
          ) : null
          }
          </Box>
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
            {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
