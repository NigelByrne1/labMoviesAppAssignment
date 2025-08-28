import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";

export const tvShowTitleFilter = (tvShow: BaseMovieProps, value: string): boolean => {
    return tvShow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const tvShowGenreFilter = (tvShow: BaseMovieProps, value: string) => {
    const genreId = Number(value);  
    const genreIds = tvShow.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface TVShowFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
}


const TVShowFilterUI: React.FC<TVShowFilterUIProps> = ({ onFilterValuesChange, tvShowTitleFilter, tvShowGenreFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={tvShowTitleFilter}
                    genreFilter={tvShowGenreFilter}
                />
            </Drawer>
        </>
    );
};

export default TVShowFilterUI;
