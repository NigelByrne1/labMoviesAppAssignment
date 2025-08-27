import React from "react";  // useState/useEffect redundant 
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as MovieImage[];
    const slicedImages = images.slice(0, 4); 
    const mainImage = slicedImages[0];
    

    return (
        <>

            <MovieHeader {...movie} />

            
            {mainImage ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500/${mainImage.file_path}`}
                    alt={movie.title}
                    style={{
                        width: "25%",
                        maxHeight: "500px",
                        objectFit: "contain",
                        marginBottom: "16px",
                        display: "block",
                    }}
                />
            ) : null}
            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {slicedImages.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={movie.title}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
