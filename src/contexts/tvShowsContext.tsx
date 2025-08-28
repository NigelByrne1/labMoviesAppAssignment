import React, { useState, useCallback } from "react";
import { BaseTVShowProps, Review } from "../types/interfaces";

interface TVShowContextInterface {
    favourites: number[];
    addToFavourites: ((tvShow: BaseTVShowProps) => void);
    removeFromFavourites: ((tvShow: BaseTVShowProps) => void);
    addReview: ((tvShow: BaseTVShowProps, review: Review) => void);

    mustWatch: number[];
    addToMustWatch: ((tvShow: BaseTVShowProps) => void);
    removeFromMustWatch: ((tvShow: BaseTVShowProps) => void);
}

const initialContextState: TVShowContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (tvShow, review) => { tvShow.id, review},

    mustWatch: [],
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
};

export const TVShowsContext = React.createContext<TVShowContextInterface>(initialContextState);

const TVShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [mustWatch, setMustWatch] = useState<number[]>([]);

    const addReview = (tvShow:BaseTVShowProps, review: Review) => {
        setMyReviews( {...myReviews, [tvShow.id]: review } )
      };

    const addToFavourites = useCallback((tvShow: BaseTVShowProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(tvShow.id)) {
                return [...prevFavourites, tvShow.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((tvShow: BaseTVShowProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== tvShow.id));
    }, []);

    const addToMustWatch = useCallback((tvShow: BaseTVShowProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(tvShow.id)) {
                const title = (tvShow as BaseTVShowProps).name;
                console.log("Added ",title, " to must watch");
                return [...prevMustWatch, tvShow.id];
            }
            return prevMustWatch;
        });
    }, []);

        const removeFromMustWatch = useCallback((tvShow: BaseTVShowProps) => {
        setMustWatch((prevMustWatch) => prevMustWatch.filter((mId) => mId !== tvShow.id));
    }, []);

    return (
        <TVShowsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch,
                addToMustWatch,
                removeFromMustWatch,
            }}
        >
            {children}
        </TVShowsContext.Provider>
    );
};

export default TVShowsContextProvider;
