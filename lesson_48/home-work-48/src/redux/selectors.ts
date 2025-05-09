import type {RootState} from "./store.ts";

export const articlesSelector = (state: RootState) => state.news.articles;

export const loadingSelector = (state: RootState) => state.news.loading;

export const errorSelector = (state: RootState) => state.news.error;

export const journalsSelector = (state: RootState) => state.news.currentId