import "../../css/Header.css"
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/reducers";
import {NavLink, useNavigate} from "react-router-dom";
import api from "../../services/api.ts";
import {logoutUser} from "../../redux/slices/authSlice.ts";
import {Box, Button, Typography} from "@mui/material";
import AdminMenuItem from "../AdminMenuItem.tsx";

const Header = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout =async () => {
        try {
            const response = await api.get('/auth/logout');
            console.log(response.data.message);
            dispatch(logoutUser());
            navigate('/auth/signin');
        } catch (error: any) {
            console.error('Logout failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <header>
            <div className={"logo-container"}>
                <img className={"header-logo"} src="/assets/images/logo.svg" alt="Logo"/>
                <img className={"header-logo-name"} src="/assets/images/logo_name.svg" alt="Logo Name"/>
            </div>
            <div>
                <img className={"header-image"} src="/assets/images/header/bookshelf.svg" alt="Bookshelf" />
                <div className={"authentication-container"}>
                    {isLoggedIn ? (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Typography>Hello, {user?.username || user?.name}!</Typography>
                            {isLoggedIn && user?.role === 'admin' && (
                                <AdminMenuItem/>
                            )}
                            <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Button variant={"outlined"} size={"small"}>Profile</Button>
                            </NavLink>
                            <Button onClick={handleLogout} variant={"contained"} size={"small"}>Log out</Button>
                        </Box>
                    ) : (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <NavLink to="/auth/signup" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Button size={"small"} variant={"outlined"}>Sign Up</Button>
                            </NavLink>
                            <NavLink to="/auth/signin" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Button size={"small"} variant={"contained"}>Sign In</Button>
                            </NavLink>
                        </Box>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header