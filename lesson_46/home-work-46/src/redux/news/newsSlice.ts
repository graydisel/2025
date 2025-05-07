import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchArticles} from './newsAPI.ts'
import {type Article} from "../../types/Article.interface.ts";

export interface newsState {
    articles: Article[];
    loading: boolean;
    currentId: number;
    error: string | null;
}

const initialState: newsState = {
    articles: [] as Article[],
    loading: false,
    currentId: 0,
    error: null,
}

export const getArticles = createAsyncThunk('news/getArticles', async () =>{
    return await fetchArticles();
})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to download articles';
            });
    }
});

export default newsSlice.reducer;