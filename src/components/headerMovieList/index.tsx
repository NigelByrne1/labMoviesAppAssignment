import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
    },
};

interface HeaderProps {
    title: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title
    const currentPage = headerProps.currentPage
    const totalPages = headerProps.totalPages

    const handleBack = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            console.log(currentPage);
        }
    };

    const handleForward = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            console.log(currentPage);
        }
    };

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton
                aria-label="go back"
                onClick={handleBack}
                disabled={currentPage <= 1}
            >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {title} {currentPage} / {totalPages}
            </Typography>
            <IconButton
                aria-label="go forward"
                onClick={handleForward}
                disabled={currentPage >= totalPages}
            >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;
