import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchArticles} from './newsAPI.ts'
import {type ArticleInterface} from "../../types/interfaces.ts";

export interface newsState {
    articles: ArticleInterface[];
    loading: boolean;
    currentId: string;
    error: string | null;
}


export const initialState: newsState = {
    articles: [] as ArticleInterface[],
    loading: false,
    currentId: 'bbc-news',
    error: null,
}



export const getArticles = createAsyncThunk('news/getArticles', async (sourceId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return await fetchArticles(sourceId);
})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        switchJournal: (state, action) => {
            state.currentId = action.payload;
            console.log(state.currentId);
        }
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

export const { switchJournal } = newsSlice.actions;
export default newsSlice.reducer;