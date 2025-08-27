import React from "react";
import MovieHeader from "../headerMovie";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';

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
        return <h1>{error.message}</h1>;
    }

    const images = data as MovieImage[];
    const limitedImages = images.slice(0, 16);

    // header is at the top
    // main image under header
    // children/movie details under main image	
    // image scroller under movie details

    return (
        <>
            <MovieHeader {...movie} />
            
            {limitedImages[0] && (
                <div style={{ padding: "20px" }}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${limitedImages[0].file_path}`}
                        alt={movie.title}
                        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                    />
                </div>
            )}
            
            <div style={{ padding: "20px" }}>
                {children}
            </div>
            
            <div style={{ padding: "20px" }}>
                <div style={{ display: 'flex', overflowX: 'auto', gap: '16px' }}>  
                    {limitedImages.map((image) => (
                        <img
                            key={image.file_path}
                            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                            alt={movie.title}
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

//overflowX: 'auto' makes the image list scrollable L+R
//gap: '16px' adds space between images
//width: '200px', height: '200px', objectFit: 'cover' makes the images square and fit the container

export default TemplateMoviePage;
