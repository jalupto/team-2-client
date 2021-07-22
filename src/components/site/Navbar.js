import React, {useState, useRef, useEffect}  from "react";
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MenuItem, MenuList, Popper, Paper, Button, ClickAwayListener, AppBar} from "@material-ui/core";
// import FavIndex from "../favorites/FavIndex";
// import FavCreate from "../favorites/FavCreate";


const Sitebar = (props) => {
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
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

        return (
            <AppBar className="sitebar" position="sticky">
                    <Button
                        ref={anchorRef}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        Account
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <li>Create Favorite</li>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <li>My account</li>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <li onClick={props.clickLogout}>
                                            Logout
                                        </li>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>
                    {/* <AppBar className="sitebar-route">
                    <BrowserRouter>
                        <Switch>
                        <Route exact path="/favcreate"><FavCreate /></Route>
                    </Switch>
                    </BrowserRouter>

                </AppBar> */}
            </AppBar>
        );

}

export default Sitebar;
