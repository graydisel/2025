import {Button, FormControl, TextField, Typography} from "@mui/material";
import "../css/SignIn.css"
import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import api from "../services/api.ts";
import {loginUser} from "../redux/slices/authSlice.ts";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/auth/signin', {
                email,
                password,
            });
            console.log('Login successful:', response.data.message);
            dispatch(loginUser(response.data.user));
            navigate('/profile');
        } catch (err: any) {
            if (err.response) {
                console.error('Login failed:', err.response.data.message);
                setError(err.response.data.message || 'Login failed. Please check your credentials.');
            } else if (err.request) {
                console.error('No response from server:', err.message);
                setError('Failed to connect to the server. Please try again later.');
            } else {
                console.error('Error setting up request:', err.message);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }


    return (
        <div className={"signin-container"}>
            {error && <Typography color="error">{error}</Typography>}
            <FormControl sx={{gap: 1, flex: 1}} component="form" onSubmit={handleSubmit}>
                <Typography>Email</Typography>
                <TextField
                    variant="outlined"
                    label={"Email"}
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Typography>Password</Typography>
                <TextField
                    variant="outlined"
                    label={"Password"}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" type={"submit"}>Sign In</Button>
            </FormControl>
        </div>
    )
}

export default SignIn