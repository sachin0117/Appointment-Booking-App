
import { useEffect, useState } from "react";
import monster from "../../assets/godzilla.gif";
import "./Error.css"
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const loopTexts = [
    <Link className="textLink" to="/signin" key="home1">home</Link>,
    <Link className="textLink" to="/signup" key="signup">signup</Link>,
];

function ErrorPage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % loopTexts.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Grid
            container
            className="fullSize"
            direction="column"
            justifyContent="center"
            alignItems="center"
            id="ERR404"
        >
            <Typography variant="h3">OH NO!</Typography>
            <Typography variant="h5" align="center">
                Page You are looking for is not available.
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <div id="beforeTooLate">
                    Go back {loopTexts[index]} before it's too late!
                </div>
                <img id="monsterImg" src={monster} alt="Godzilla" />
            </Grid>
        </Grid>
    );
}


export default ErrorPage
