import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
    id: string;
    name: string;
    username: string;
    email: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: AuthUser | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<AuthUser>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },

        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },

        setAuthStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
            state.status = action.payload;
        },

        setAuthError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.status = 'failed';
        }
    }
});

export const { loginUser, logoutUser, setAuthStatus, setAuthError } = authSlice.actions;
export default authSlice.reducer;