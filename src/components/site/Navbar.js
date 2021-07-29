import React, {useState, useRef, useEffect}  from "react";
import { Route, Link } from "react-router-dom";
import { MenuItem, MenuList, Popper, Paper, Button, ClickAwayListener, AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavIndex from "../favorites/FavIndex";
import FavMap from "../favorites/FavMap";
import "../../../src/App.css";
import Auth from "../auth/Auth";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Hotels from "../destinations/Hotels";
import CityFetch from "../destinations/City";
import Toggle from "../site/darkToggle/Toggler"; //add dark mode toggle to navbar
import { GlobalStyles } from "../site/darkToggle/Global";
import { lightTheme, darkTheme } from "../site/darkToggle/Themes";
import { useDarkMode } from "../site/darkToggle/useDarkMode";
import { ThemeProvider } from "styled-components";

//====================================================================================================================
// MADE BY CHERRON
//====================================================================================================================

const Sitebar = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
const [sessionToken, setSessionToken] = useState("");
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSessionToken(localStorage.getItem("token"));
        }
    }, []);

    const updateToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setSessionToken(newToken);
    console.log(sessionToken);
    };

    const clearToken = () => {
        localStorage.clear();
        setSessionToken("");
    };

    const protectedViews = () => {
        return sessionToken === localStorage.getItem("token") ? (
            <FavIndex token={sessionToken} />
        ) : (
            <Auth updateToken={updateToken} />
        );
    };

    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    if (!mountedComponent) return <div />;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Grid container direction="row" alignItems="center" spacing={0}>
                <Grid item xs={12}>
                    <AppBar className="sitebar" position="sticky">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Juno
                            </Typography>
                            <Toggle theme={theme} toggleTheme={themeToggler} />
                            <Button
                                ref={anchorRef}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <AccountCircleIcon />
                                Account
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                <Paper className="sitebar-menu">
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList
                                            className="sitebar-list"
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/">Map</Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/favs">
                                                    Favorites Dashboard
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/itinerary">
                                                    Itinerary Builder
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <li onClick={clearToken}>
                                                    Logout
                                                </li>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Popper>
                        </Toolbar>
                    </AppBar>
                </Grid>

                <Route exact path="/favs">
                    {protectedViews()}
                </Route>
                <Route exact path="/itinerary">
                    <CityFetch />
                </Route>
                <Route exact path="/">
                    <FavMap />
                </Route>
            </Grid>
        </ThemeProvider>
    );
};

export default Sitebar;
