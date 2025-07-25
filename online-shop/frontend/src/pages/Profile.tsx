import {useSelector} from "react-redux";
import type {RootState} from "../redux/reducers";
import { useNavigate } from 'react-router-dom';
import {Box, Paper, Typography} from "@mui/material";
import {useEffect} from "react";


const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || !user) {
            navigate('/auth/signin');
        }
    }, [isLoggedIn, user, navigate]);

    if (!isLoggedIn || !user) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" color="error">Not authorised. You wil be redirected</Typography>
            </Box>
        );
    }
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Name: {user.name || user.username}</Typography> {/* Предполагаем, что у вас есть 'name' или 'username' */}
                <Typography variant="h6">Username: {user.username}</Typography>
                <Typography variant="h6">Email: {user.email}</Typography>
                <Typography variant="h5" sx={{ mt: 3 }}>Your cart</Typography>
            </Paper>
        </Box>
    )
}

export default Profile;