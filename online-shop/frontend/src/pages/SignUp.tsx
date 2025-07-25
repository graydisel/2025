import {Button, FormControl, TextField, Typography} from '@mui/material';
import "../css/SignUp.css"
import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api.ts";


const SignUp = () => {
        const [name, setName] = useState('');
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState<string | null>(null);
        const navigate = useNavigate();

        const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('auth/signup', {
                name,
                username,
                email,
                password,
            });
            console.log('Registration successful:', response.data.message);
            navigate('/');
        } catch (err: any) {
            if (err.response) {
                console.error('Registration failed:', err.response.data.message);
                setError(err.response.data.message || 'Registration failed. Please try again.');
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
        <div className={"signup-container"}>
            {error && <Typography color="error">{error}</Typography>}
            <FormControl sx={{gap: 1, flex: 1}} component="form" onSubmit={handleSubmit}>
                <Typography>Name</Typography>
                <TextField
                    variant="outlined"
                    label={"Name"}
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Typography>Username</Typography>
                <TextField
                    variant="outlined"
                    label={"Username"}
                    type={"text"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <Button variant="contained" type={"submit"}>Register</Button>
            </FormControl>
        </div>
    )
}

export default SignUp