import axios from 'axios';
import type {ArticleInterface} from "../../types/interfaces.ts";

export const fetchArticles = async (sourceId: string): Promise<ArticleInterface[]> => {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=ce7e6c04e3f74453858b6a39158eae50`);
    return response.data.articles;
}